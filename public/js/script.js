const $ = (sel) => document.querySelector(sel);

$('#cityForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const raw = $('#cityInput').value
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  await fetch('/api/cities/original', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(raw),
  });

  alert('Исходный массив сохранён!');
  $('#cityInput').value = '';
});

$('#showOriginal').addEventListener('click', () => renderList('original'));
$('#fixAndShow').addEventListener('click', async () => {
  const originalResp = await fetch('/api/cities/original');
  const originalData = await originalResp.json();

  const res = await fetch('/api/cities/fix', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(originalData),
  });
  const data = await res.json();
  fillList($('#fixedList'), data);
});

async function renderList(type) {
  const res = await fetch(`/api/cities/${type}`);
  const data = await res.json();
  fillList(type === 'original' ? $('#originalList') : $('#fixedList'), data);
}

function fillList(target, arr) {
  target.innerHTML = arr.map((c) => `<li>${c}</li>`).join('');
}
