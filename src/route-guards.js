import { useAuthGuard } from './features/auth/guards/auth.guard';
import { useGuestGuard } from './features/auth/guards/guest.guard';

export const routeGuards = [useAuthGuard, useGuestGuard];
