import { useState } from 'react';
import { formatId, formatName, getGeneration } from '../utils/pokemon';

export default function SearchPanel({ pokemon, value, setValue, onSearch }) {
  const submit = (e) => { e?.preventDefault(); if (value.trim()) onSearch(value); };
  return (
    <div className="right-screen">
      <form className="search-box" onSubmit={submit}>
        <label>BUSCAR POKÉMON</label>
        <div className="search-row"><input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Nombre o #ID" /><button>OK</button></div>
        <div className="right-info">{pokemon ? `${formatId(pokemon.id)} · ${formatName(pokemon.name)} · GEN ${getGeneration(pokemon.id)}` : 'ESPERANDO...'}</div>
      </form>
    </div>
  );
}
