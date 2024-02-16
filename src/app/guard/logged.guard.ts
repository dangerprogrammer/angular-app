import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const loggedGuard: CanActivateFn = () => {
  const { getStorageStatus } = new UserService();
  const { navigate } = new Router();

  const isLogged = getStorageStatus();

  if (!isLogged) return !0;

  navigate(["/"]);
  return !1;
};
