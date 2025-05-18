import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function useCurrentUser() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { // Si no hay token aún, no se intenta llamar al backend.
      navigate('/login');
      return;
    }

    async function fetchUser() {
      try {
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (err: any) {
        console.error('❌ Error cargando el usuario logueado:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    }

    fetchUser();
  }, [navigate]);

  return user;
}