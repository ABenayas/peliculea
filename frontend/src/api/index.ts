import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Intercepta cada petición y le mete el token si existe, para usar el token automáticamente en todas las peticiones.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
