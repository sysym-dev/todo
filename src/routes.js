import { doneRoutes } from './features/done/done.routes';
import { homeRoutes } from './features/home/home.routes';
import { lateRoutes } from './features/late/late.routes';
import { upcomingRoutes } from './features/upcoming/upcoming.routes';

export const routes = [
  ...homeRoutes,
  ...lateRoutes,
  ...upcomingRoutes,
  ...doneRoutes,
];
