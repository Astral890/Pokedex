import { useEffect, useState } from 'react';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import CollectionPanel from './components/CollectionPanel';
import { useAuth } from './hooks/useAuth';
import { usePokemon } from './hooks/usePokemon';
import { useCollection } from './hooks/useCollection';

export default function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const pokemonState = usePokemon();
  const collection = useCollection(Boolean(user));
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'ArrowRight') pokemonState.next();
      if (event.key === 'ArrowLeft') pokemonState.previous();
      if (event.key.toLowerCase() === 'r') pokemonState.random();
      if (event.key === '/') document.querySelector('.search-row input')?.focus();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pokemonState.next, pokemonState.previous, pokemonState.random]);

  if (authLoading) return <div className="loading-page">Cargando PokéDex...</div>;
  if (!user) return <AuthScreen />;

  const controls = {
    search: (value) => { setSearchValue(value); pokemonState.loadPokemon(value); },
    digit: (digit) => setSearchValue((current) => current + digit),
    clear: () => setSearchValue(''),
    next: pokemonState.next,
    previous: pokemonState.previous,
    random: pokemonState.random
  };

  const toggleFavorite = async (item) => {
    try { await collection.update(item.id, { favorite: !item.favorite }); } catch (err) { alert(err.message); }
  };

  return (
    <div className="app-shell">
      <Header user={user} onLogout={logout} collectionCount={collection.items.length} />
      <main className="main-content">
        <section className="pokedex-wrap">
          <div className="pokedex">
            <LeftPanel pokemonState={pokemonState} controls={controls} />
            <RightPanel pokemonState={pokemonState} controls={controls} collection={collection} searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </section>
        <CollectionPanel items={collection.items} loading={collection.loading} onToggleFavorite={toggleFavorite} onRemove={collection.remove} />
      </main>
    </div>
  );
}
