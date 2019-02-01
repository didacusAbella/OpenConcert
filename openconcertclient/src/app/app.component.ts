import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  public entries: MenuItem[];


  public ngOnInit(): void {
    this.entries = [
      { label: "Eventi", icon: 'pi pi-calendar', routerLink: "events" },
      { 
        label: "Profilo", icon: 'pi pi-user', items: 
        [
          { label: "Login", icon: 'pi pi-sign-in', routerLink: "signin" },
          { label: "Registrati", icon: 'pi pi-user-plus', routerLink: "signup" },
          { label: "Logout", icon: 'pi pi-sign-out'}
        ]
      },
      { 
        label: "Gestisci", icon: 'pi pi-bars', items:
        [
          { label: "Locali", icon: 'pi pi-home'},
          { label: "Amici", icon: 'pi pi-users', routerLink: "friends"},
          { label: "Gruppi Musicali", icon: 'pi pi-cog' }
        ] 
      },
    ]
  }

  
  
}
