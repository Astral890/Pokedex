import { formatId, formatName } from '../utils/pokemon';

export default function PokemonScreen({ pokemon, loading, error }) {
  if (loading) return <div className="screen-message">CONSULTANDO POKÉAPI...</div>;
  if (error) return <div className="screen-message error-text">{error}</div>;
  if (!pokemon) return <div className="screen-message">SIN DATOS</div>;

  const stats = [
    ['HP', pokemon.stats.hp], ['ATK', pokemon.stats.attack],
    ['DEF', pokemon.stats.defense], ['SPD', pokemon.stats.speed]
  ];

  return (
    <div className="pokemon-view">
      <div className="pokemon-number">{formatId(pokemon.id)}</div>
      <img src={pokemon.image} alt={formatName(pokemon.name)} />
      <div className="pokemon-details">
        <h2>{formatName(pokemon.name)}</h2>
        <div className="types">{pokemon.types.map((type) => <span key={type} className="type">{formatName(type)}</span>)}</div>
      </div>
      <div className="stats">{stats.map(([name, value]) => <div key={name}><strong>{value}</strong><small>{name}</small></div>)}</div>
    </div>
  );
}
