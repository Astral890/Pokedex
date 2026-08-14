import SearchPanel from './SearchPanel';
import Keypad from './Keypad';

export default function RightPanel({ pokemonState, controls, collection, searchValue, setSearchValue }) {
  const { pokemon } = pokemonState;
  const handleAdd = async () => {
    if (!pokemon) return;
    try { await collection.add(pokemon); } catch (err) { alert(err.message); }
  };

  return (
    <section className="right-panel">
      <SearchPanel pokemon={pokemon} value={searchValue} setValue={setSearchValue} onSearch={controls.search} />
      <Keypad onDigit={controls.digit} />
      <button className="yellow-button" onClick={controls.clear} title="Limpiar búsqueda" />
      <div className="right-buttons">
        <button onClick={controls.previous}>◀ ANTERIOR</button>
        <button onClick={controls.next}>SIGUIENTE ▶</button>
        <button onClick={handleAdd}>＋ AGREGAR</button>
        <button onClick={controls.random}>ALEATORIO</button>
      </div>
    </section>
  );
}
