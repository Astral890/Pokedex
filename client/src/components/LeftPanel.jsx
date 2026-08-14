import PokemonScreen from './PokemonScreen';

export default function LeftPanel({ pokemonState, controls }) {
  const { pokemon, loading, error } = pokemonState;
  return (
    <section className="left-panel">
      <div className="camera" />
      <div className="lights"><span className="light green blink" /><span className="light yellow" /><span className="light red" /></div>
      <div className="screen-container"><div className="screen"><PokemonScreen pokemon={pokemon} loading={loading} error={error} /></div></div>
      <div className="controls">
        <button className="circle-button" onClick={controls.random} title="Aleatorio" />
        <div className="dpad">
          <button onClick={controls.previous}>▲</button><button onClick={controls.previous}>◀</button>
          <button onClick={controls.random}>●</button><button onClick={controls.next}>▶</button><button onClick={controls.next}>▼</button>
        </div>
        <div className="small-screen">READY</div>
      </div>
      <div className="line line-1" /><div className="line line-2" /><div className="hinge" />
    </section>
  );
}
