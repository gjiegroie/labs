// script.js
// Массив для хранения данных об автомобилях и истории
let cars = JSON.parse(localStorage.getItem('cars')) || [];
let history = JSON.parse(localStorage.getItem('history')) || [];

// Функция для отображения данных в таблице
function renderTable() {
    const tableBody = document.getElementById('carTableBody');
    tableBody.innerHTML = '';

    cars.map((car, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${car.vin}</td>
            <td>${car.name}</td>
            <td>${car.releaseDate}</td>
            <td>${car.manufacturerAddress}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Функция для отображения истории
function renderHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    history.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = `${item.timestamp}: ${item.message}`;
        historyList.appendChild(div);
    });
    
    // Автоматическая прокрутка к последнему элементу
    historyList.scrollTop = historyList.scrollHeight;
}

// Функция для добавления записи в историю
function addHistoryEntry(message) {
    const timestamp = new Date().toLocaleString('ru-RU');
    history.push({ timestamp, message });
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

// Функция для добавления новой записи
function addCar() {
    addHistoryEntry('Нажата кнопка "Добавить"');
    
    const vin = document.getElementById('vin').value;
    const name = document.getElementById('name').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const manufacturerAddress = document.getElementById('manufacturerAddress').value;

    if (!vin || !name || !releaseDate || !manufacturerAddress) {
        addHistoryEntry('Ошибка: Не все поля заполнены');
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const existingCar = cars.find(car => car.vin === vin);
    if (existingCar) {
        addHistoryEntry(`Ошибка: Автомобиль с VIN ${vin} уже существует`);
        alert('Автомобиль с таким VIN-кодом уже существует!');
        return;
    }

    const newCar = { vin, name, releaseDate, manufacturerAddress };
    cars.push(newCar);
    localStorage.setItem('cars', JSON.stringify(cars));
    
    addHistoryEntry(`Успешно добавлена новая запись с ID ${cars.length} (VIN: ${vin})`);
    
    renderTable();
    clearForm();
}

// Функция для очистки формы
function clearForm() {
    addHistoryEntry('Нажата кнопка "Очистить форму"');
    document.getElementById('carForm').reset();
    addHistoryEntry('Форма успешно очищена');
}

// Функция для удаления записи по ID
function deleteCar() {
    addHistoryEntry('Нажата кнопка "Удалить по ID"');
    
    const id = prompt('Введите ID записи для удаления:');
    if (!id) {
        addHistoryEntry('Отмена удаления: ID не введён');
        return;
    }

    const index = parseInt(id) - 1;

    if (index < 0 || index >= cars.length) {
        addHistoryEntry(`Ошибка: Запись с ID ${id} не найдена`);
        alert('Запись с таким ID не найдена!');
        return;
    }

    const deletedCar = cars[index];
    cars = cars.filter((_, i) => i !== index);
    localStorage.setItem('cars', JSON.stringify(cars));
    
    addHistoryEntry(`Успешно удалена запись с ID ${index + 1} (VIN: ${deletedCar.vin})`);
    
    renderTable();
}

// Функция для вывода всех данных в новом окне
function showAllCars() {
    addHistoryEntry('Нажата кнопка "Вывести все"');
    
    const totalCars = cars.reduce((acc) => acc + 1, 0);
    const carRows = cars.map((car, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${car.vin}</td>
            <td>${car.name}</td>
            <td>${car.releaseDate}</td>
            <td>${car.manufacturerAddress}</td>
        </tr>
    `).join('');

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
        <head>
            <title>Все автомобили</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; }
                h2 { color: #2c3e50; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #2c3e50; color: white; }
                tr:nth-child(even) { background-color: #f9f9f9; }
                tr:hover { background-color: #f1f1f1; }
            </style>
        </head>
        <body>
            <h2>Все автомобили (Всего: ${totalCars})</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>VIN-код</th>
                        <th>Название</th>
                        <th>Дата выпуска</th>
                        <th>Адрес производителя</th>
                    </tr>
                </thead>
                <tbody>
                    ${carRows}
                </tbody>
            </table>
        </body>
        </html>
    `);
    newWindow.document.close();
    
    addHistoryEntry(`Открыто окно со списком всех автомобилей (всего: ${totalCars})`);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    renderHistory();
});
