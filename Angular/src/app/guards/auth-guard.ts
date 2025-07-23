import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o usuário for admin, permite o acesso
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // Se não for admin, redireciona para a página inicial
  router.navigate(['/home']);
  return false;
};
