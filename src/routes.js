import { cardRoutes } from './features/card/card.routes';
import { homeRoutes } from './features/home/home.routes';
import { transactionRoutes } from './features/transaction/transaction.routes';

export const routes = [...homeRoutes, ...cardRoutes, ...transactionRoutes];
