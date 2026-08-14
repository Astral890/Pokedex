import { useCallback, useEffect, useState } from 'react';
import { getPokemon, normalizePokemon } from '../services/pokeApi';

const MAX_POKEMON = 1025;

export function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPokemon = useCallback(async (query) => {
    setLoading(true);
    setError('');
    try {
      const data = await getPokemon(query);
      setPokemon(normalizePokemon(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const next = useCallback(() => {
    if (pokemon) loadPokemon(Math.min(MAX_POKEMON, pokemon.id + 1));
  }, [pokemon, loadPokemon]);

  const previous = useCallback(() => {
    if (pokemon) loadPokemon(Math.max(1, pokemon.id - 1));
  }, [pokemon, loadPokemon]);

  const random = useCallback(() => {
    loadPokemon(Math.floor(Math.random() * MAX_POKEMON) + 1);
  }, [loadPokemon]);

  useEffect(() => {
    loadPokemon(1);
  }, [loadPokemon]);

  return { pokemon, loading, error, loadPokemon, next, previous, random };
}
