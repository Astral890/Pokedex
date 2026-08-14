const BASE_URL = 'http://192.168.100.7:4000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('pokedex_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if(response.staus === 401) console.log("401");
  if (!response.ok) throw new Error(data.message || 'Error en la solicitud.');
  return data;
}

export const authApi = {
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me')
};

export const collectionApi = {
  list: () => request('/collection'),
  add: (body) => request('/collection', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/collection/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => request(`/collection/${id}`, { method: 'DELETE' })
};
