function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function processCities(arr) {
  return arr.map(capitalize).sort((a, b) => a.localeCompare(b));
}

module.exports = { processCities };
