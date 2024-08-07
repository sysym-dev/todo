import { authRoutes } from './features/auth/auth.routes';
import { cardRoutes } from './features/card/card.routes';
import { homeRoutes } from './features/home/home.routes';
import { profileRoutes } from './features/profile/profile.routes';
import { reportRoutes } from './features/report/report.routes';
import { setupRoutes } from './features/setup/setup.routes';
import { transactionRoutes } from './features/transaction/transaction.routes';

export const routes = [
  ...homeRoutes,
  ...cardRoutes,
  ...transactionRoutes,
  ...reportRoutes,
  ...authRoutes,
  ...profileRoutes,
  ...setupRoutes,
];
