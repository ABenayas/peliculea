export function useAuth() {
  const token = localStorage.getItem('token');
  return !!token; // Devuelve true si hay token
}
