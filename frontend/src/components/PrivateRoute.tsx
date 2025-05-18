import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

function PrivateRoute({ children }: Props) { // PrivateRoute controla que exista un token, si no hay token, redirige a Login y si hay token, renderiza Home.
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;

