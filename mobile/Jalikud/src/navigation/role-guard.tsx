import { usePathname, useRouter } from 'expo-router';
import { useEffect, useMemo, type ReactNode } from 'react';

import { homeRouteForRole } from '@/constants/routes';
import { useAuthStore } from '@/store/auth-store';
import type { UserRole } from '@/types';

interface RoleGuardProps {
  allow: UserRole | readonly UserRole[];
  children: ReactNode;
}

export function RoleGuard({ allow, children }: RoleGuardProps) {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();

  const allowedRoles: UserRole[] = useMemo(
    () => (allow instanceof Array ? [...allow] : [allow]),
    [allow],
  );

  useEffect(() => {
    if (user && !allowedRoles.includes(user.role)) {
      router.replace(homeRouteForRole(user.role));
    }
  }, [user, allowedRoles, pathname, router]);

  return <>{children}</>;
}
