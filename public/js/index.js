const list = document.getElementById('city-list');
const btn = document.getElementById('show-processed');

fetch('/api/cities')
  .then(res => res.json())
  .then(data => {
    data.original.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      list.appendChild(li);
    });
  });

btn.addEventListener('click', () => {
  window.location.href = 'html/page2.html';
});
