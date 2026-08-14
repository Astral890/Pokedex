import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') await login({ email: form.email, password: form.password });
      else await register(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-logo"><span /> <b>PokéDex</b> Manager</div>
        <h1>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p className="muted">Gestiona tu colección personal de Pokémon.</p>
        <form onSubmit={submit}>
          {mode === 'register' && (
            <label>Nombre<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          )}
          <label>Correo<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
          <label>Contraseña<input type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
          {error && <div className="alert error">{error}</div>}
          <button className="primary-button" disabled={busy}>{busy ? 'Cargando...' : mode === 'login' ? 'ENTRAR' : 'REGISTRARME'}</button>
        </form>
        <button className="link-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
          {mode === 'login' ? '¿No tienes cuenta? Regístrate' : 'Ya tengo una cuenta'}
        </button>
      </section>
    </main>
  );
}
