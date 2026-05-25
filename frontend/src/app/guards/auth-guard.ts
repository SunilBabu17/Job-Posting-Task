import { inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const user = signal<any>(null);
  const router = inject(Router)
  user.set(localStorage.getItem('user'));
  if(user()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
