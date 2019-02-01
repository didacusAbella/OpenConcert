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
      { label: "Home", icon: 'pi pi-home', routerLink: "events" },
      { label: "Ricerca Automatica", icon: 'pi pi-search' },
      { label: "Profilo", icon: 'pi pi-user', routerLink: "profile" },
      { label: "Login", icon: 'pi pi-sign-in', routerLink: "login" },
      { label: "Registrati", icon: 'pi pi-user-plus', routerLink: "signup" },
      { label: "Aggiungi Locale", icon: 'pi pi-plus', routerLink: "locales" },
      { label: "Amici", icon: 'pi pi-users', routerLink: "friends" }
    ]
  }

  
  
}
