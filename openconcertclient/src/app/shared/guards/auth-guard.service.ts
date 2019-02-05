import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/signin']);
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