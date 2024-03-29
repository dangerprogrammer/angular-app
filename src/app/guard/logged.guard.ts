import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const { getStorageStatus, getRedirect } = new UserService();
  const routerService = new Router();

  const hasRedirect = getRedirect();
  const isLogged = getStorageStatus();

  if (hasRedirect && state.url != hasRedirect) {
    routerService.navigate([hasRedirect]);
    return !1;
  };

  if (!isLogged) return !0;

  routerService.navigate(["/"]);
  return !1;
};
