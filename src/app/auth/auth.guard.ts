import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private logger: NGXLogger) { };
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    this.logger.log('CanActivate called with: '+route.routeConfig);
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/app/auth'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
