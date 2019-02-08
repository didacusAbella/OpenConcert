import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/unauthorized']);
      return false;
    } else {
      return true;
    }
  }

  private isAuthenticated(): boolean {
    const token = localStorage.getItem('secretforcreateauth');
    return token != null;
  } 

}