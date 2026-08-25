import { useAuthStore } from '@/store/auth-store';

export function useAuth() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);

  return {
    status,
    user,
    login,
    register,
    logout,
    isAuthenticated: status === 'authenticated',
    isCustomer: user?.role === 'customer',
    isStaff: user?.role === 'staff',
  };
}
