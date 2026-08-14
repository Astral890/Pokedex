import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('pokedex_token');
    if (!token) {
      setLoading(false);
      return;
    }
    authApi.me()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem('pokedex_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    localStorage.setItem('pokedex_token', data.token);
    setUser(data.user);
  };

  const register = async (payload) => {
    const data = await authApi.register(payload);
    localStorage.setItem('pokedex_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('pokedex_token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
