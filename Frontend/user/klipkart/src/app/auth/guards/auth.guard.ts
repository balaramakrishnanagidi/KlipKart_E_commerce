import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const authService = new AuthService();

  if(authService.isAuthenticated()){
    return true;
  }

  const router: Router = new Router();

  return state.url === '/login' ? true : router.createUrlTree(['/login']);
};
