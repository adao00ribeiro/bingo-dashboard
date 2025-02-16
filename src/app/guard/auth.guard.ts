import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const tokenData = sessionStorage.getItem('token-data');
  if (!tokenData) {
    router.navigateByUrl('/login');
    return false;
  }
  try {
    const decoded = jwtDecode<{ role?: string }>(tokenData);
    const allowedRoles = ["Seller", "Admin"];
    console.log(decoded)
    if (decoded.role && allowedRoles.includes(decoded.role)) {
      return true;
    }
    router.navigateByUrl('/login');
    return false;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    router.navigateByUrl('/login');
    return false;
  }
};
