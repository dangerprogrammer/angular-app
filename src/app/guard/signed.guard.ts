import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const signedGuard: CanActivateFn = (route, state) => {
  const userService = new UserService();

  // Lógica de sign-up

  return !0;
};
