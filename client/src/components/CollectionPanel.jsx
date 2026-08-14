import { formatId, formatName } from '../utils/pokemon';

export default function CollectionPanel({ items, loading, onToggleFavorite, onRemove }) {
  return (
    <section className="collection-panel">
      <div className="section-title"><h2>Mi colección</h2><span>{items.length} Pokémon</span></div>
      {loading ? <p className="muted">Cargando colección...</p> : items.length === 0 ? <p className="muted">Aún no tienes Pokémon guardados. Busca uno y pulsa “Agregar”.</p> : (
        <div className="collection-grid">
          {items.map((item) => (
            <article className="collection-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div><strong>{formatId(item.pokemonId)} {formatName(item.name)}</strong><small>{item.types.join(' · ')}</small></div>
              <div className="card-actions"><button onClick={() => onToggleFavorite(item)}>{item.favorite ? '★' : '☆'}</button><button onClick={() => onRemove(item.id)}>×</button></div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
