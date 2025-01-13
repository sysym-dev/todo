import { useAuthGuard } from './features/auth/guards/auth.guard';

export const routeGuards = [useAuthGuard];
