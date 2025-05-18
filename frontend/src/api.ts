import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => { // Añade el token automáticamente, si existe, a todas las peticiones.
  const token = localStorage.getItem('token'); // Coge el token automáticamente de localStorage.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use( // Para manejar errores globales.
  (response) => response,
  (error) => {
    if (error.response?.status === 401) { // Token caducado o inválido.
      localStorage.removeItem('token'); // Si el backend responde 401, lo interpreta como “token inválido o caducado”, por tanto, borra el token.
      window.location.href = '/login'; // Y redirige al login.
    }
    return Promise.reject(error);
  }
);

export default api;
