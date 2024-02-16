import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = new UserService();
  const routerService = new Router();

  const isLogged = userService.getStorageStatus();

  if (isLogged) return !0;

  routerService.navigate(["/sign-up"]);
  return !1;
};
