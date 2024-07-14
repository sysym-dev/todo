import { cardRoutes } from './features/card/card.routes';
import { homeRoutes } from './features/home/home.routes';

export const routes = [...homeRoutes, ...cardRoutes];
