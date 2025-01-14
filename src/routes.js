import { authRoutes } from './features/auth/auth.routes';
import { doneRoutes } from './features/done/done.routes';
import { homeRoutes } from './features/home/home.routes';
import { lateRoutes } from './features/late/late.routes';
import { upcomingRoutes } from './features/upcoming/upcoming.routes';

export const routes = [
  ...authRoutes,
  ...homeRoutes,
  ...lateRoutes,
  ...upcomingRoutes,
  ...doneRoutes,
];
