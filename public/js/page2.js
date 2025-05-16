const list = document.getElementById('city-list');

fetch('/api/cities')
  .then(res => res.json())
  .then(data => {
    data.processed.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      list.appendChild(li);
    });
  });
