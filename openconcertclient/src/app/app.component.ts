import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  public entries: MenuItem[];

  
  constructor(private authService: AuthService, private router: Router) {}


  public ngOnInit(): void {
    this.entries = [
      { label: "Eventi", icon: 'pi pi-calendar', routerLink: "events" },
      { 
        label: "Profilo", icon: 'pi pi-user', routerLink: 'profile', items: 
        [
          { label: "Login", icon: 'pi pi-sign-in', routerLink: "signin" },
          { label: "Registrati", icon: 'pi pi-user-plus', routerLink: "signup" },
          { label: "Logout", icon: 'pi pi-sign-out', command: () => this.logout() }
        ]
      },
      { 
        label: "Visualizza", icon: 'pi pi-info', items:
        [
          { label: "Locali", icon: 'pi pi-home', routerLink: "locales"},
          { label: "Amici", icon: 'pi pi-users', routerLink: "friends"},
          { label: "Gruppi Musicali", icon: 'pi pi-cog', routerLink: "bands" }
        ] 
      },
    ]
  }

  public logout() {
    let logout = this.authService.logout();
    if(logout) {
      this.router.navigate(['/signin']);
    }
  }
  
}
