import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        console.log(user);
        const isAuth = !!user;
        if (isAuth) {
          console.log(`jest Auth`);
          return true;
        }
        console.log(`nie ma auth`);
        this.router.navigate(['./auth']);
        return false;
      })
    );
  }
}
