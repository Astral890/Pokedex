const API = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemon(query) {
  const response = await fetch(`${API}/${encodeURIComponent(String(query).trim().toLowerCase())}`);
  if (!response.ok) throw new Error('Pokémon no encontrado.');
  return response.json();
}

export function normalizePokemon(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default,
    types: pokemon.types.map(({ type }) => type.name),
    stats: pokemon.stats.reduce((acc, item) => ({ ...acc, [item.stat.name]: item.base_stat }), {})
  };
}
