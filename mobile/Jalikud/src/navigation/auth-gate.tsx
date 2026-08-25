import { usePathname, useRouter } from 'expo-router';
import { useEffect, type ReactNode } from 'react';

import { AUTH_ROUTE_PATHS, homeRouteForRole } from '@/constants/routes';
import { useAuthStore } from '@/store/auth-store';

export function AuthGate({ children }: { children: ReactNode }) {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    const isOnAuthRoute = AUTH_ROUTE_PATHS.some((path) => pathname.startsWith(path));

    if (status === 'unauthenticated' && !isOnAuthRoute) {
      router.replace('/login');
      return;
    }

    if (status === 'authenticated' && isOnAuthRoute && user) {
      router.replace(homeRouteForRole(user.role));
    }
  }, [status, user, pathname, router]);

  return <>{children}</>;
}
