// Массив для хранения данных об автомобилях
let cars = JSON.parse(localStorage.getItem('cars')) || [];

// Функция для отображения данных в таблице
function renderTable() {
    const tableBody = document.getElementById('carTableBody');
    tableBody.innerHTML = '';

    // Используем map для создания строк таблицы
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

// Функция для добавления новой записи
function addCar() {
    const vin = document.getElementById('vin').value;
    const name = document.getElementById('name').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const manufacturerAddress = document.getElementById('manufacturerAddress').value;

    // Проверка, что все поля заполнены
    if (!vin || !name || !releaseDate || !manufacturerAddress) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    // Проверка, существует ли уже запись с таким VIN-кодом (используем find)
    const existingCar = cars.find(car => car.vin === vin);
    if (existingCar) {
        alert('Автомобиль с таким VIN-кодом уже существует!');
        return;
    }

    // Добавляем новую запись
    const newCar = { vin, name, releaseDate, manufacturerAddress };
    cars.push(newCar);

    // Сохраняем в localStorage
    localStorage.setItem('cars', JSON.stringify(cars));

    // Обновляем таблицу
    renderTable();

    // Очищаем форму
    clearForm();
}

// Функция для очистки формы
function clearForm() {
    document.getElementById('carForm').reset();
}

// Функция для удаления записи по ID
function deleteCar() {
    const id = prompt('Введите ID записи для удаления:');
    if (!id) return;

    const index = parseInt(id) - 1;

    // Проверяем, существует ли запись с таким ID
    if (index < 0 || index >= cars.length) {
        alert('Запись с таким ID не найдена!');
        return;
    }

    // Удаляем запись (используем filter)
    cars = cars.filter((_, i) => i !== index);

    // Сохраняем в localStorage
    localStorage.setItem('cars', JSON.stringify(cars));

    // Обновляем таблицу
    renderTable();
}

// Функция для вывода всех данных в новом окне
function showAllCars() {
    // Используем reduce для подсчёта общего количества автомобилей
    const totalCars = cars.reduce((acc) => acc + 1, 0);

    // Используем map для формирования HTML-строк
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
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                h2 {
                    color: #2c3e50;
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    background-color: white;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #2c3e50;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
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
}

// Инициализация таблицы при загрузке страницы
document.addEventListener('DOMContentLoaded', renderTable);