import { useCallback, useEffect, useState } from 'react';
import { collectionApi } from '../services/api';

export function useCollection(enabled) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      const data = await collectionApi.list();
      setItems(data.items);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (pokemon) => {
    const data = await collectionApi.add({
      pokemonId: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.types
    });
    setItems((current) => [...current, data.item]);
  };

  const update = async (id, changes) => {
    const data = await collectionApi.update(id, changes);
    setItems((current) => current.map((item) => item.id === id ? data.item : item));
  };

  const remove = async (id) => {
    await collectionApi.remove(id);
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return { items, loading, error, add, update, remove, refresh };
}
