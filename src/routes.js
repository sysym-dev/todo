import { homeRoutes } from './features/home/home.routes';
import { lateRoutes } from './features/late/late.routes';

export const routes = [...homeRoutes, ...lateRoutes];
