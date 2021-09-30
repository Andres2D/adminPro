import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService, private router: Router) {}

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]) {
    return this.userService.validateToken()
    .pipe(
      tap(isAuth => {
        if(!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    )
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    return this.userService.validateToken()
    .pipe(
      tap(isAuth => {
        if(!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    )
  }
  
}
