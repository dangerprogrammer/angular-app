import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userGuard: CanActivateFn = () => {
  const { getStorageStatus, getRedirect } = new UserService();
  const routerService = new Router();

  const isLogged = getStorageStatus();
  const hasRedirect = getRedirect();

  if (isLogged) return !0;

  routerService.navigate([hasRedirect || "/sign-up"]);
  return !1;
};
