export function formatName(name = '') {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function getGeneration(id) {
  if (id <= 151) return 'I';
  if (id <= 251) return 'II';
  if (id <= 386) return 'III';
  if (id <= 493) return 'IV';
  if (id <= 649) return 'V';
  if (id <= 721) return 'VI';
  if (id <= 809) return 'VII';
  if (id <= 905) return 'VIII';
  return 'IX';
}
