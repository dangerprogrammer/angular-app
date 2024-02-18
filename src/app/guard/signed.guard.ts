import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const signedGuard: CanActivateFn = (route, state) => {
  const { getRedirect } = new UserService();
  const routerService = new Router();

  const hasRedirect = getRedirect();

  if (hasRedirect) {
    routerService.navigate([hasRedirect]);
    return !1;
  };

  return !0;
};
