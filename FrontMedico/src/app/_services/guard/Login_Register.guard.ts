import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';

export const loginRegisterGuard: CanActivateFn = (route, state) => {
  const token = inject(StorageService);
  const router = inject(Router);
  if (!token.isLogged()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
