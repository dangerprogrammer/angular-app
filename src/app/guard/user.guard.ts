import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userGuard: CanActivateFn = () => {
  const { getStorageStatus } = new UserService();
  const routerService = new Router();

  const isLogged = getStorageStatus();

  if (isLogged) return !0;

  routerService.navigate(["/sign-up"]);
  return !1;
};
