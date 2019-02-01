import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) {}

  public isAuthenticated() :boolean {
    const token = localStorage.getItem('secretforcreateauth');
    return !this.jwtHelper.isTokenExpired(token);
  }
}