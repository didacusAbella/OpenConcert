import { Component } from "@angular/core";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  host: { 'class': 'p-col-8'}
})
export class UnauthorizedComponent {
  public title: string;
  public subtitle: string;

  constructor(){
    this.title = "Permesso Negato!";
    this.subtitle = "Non hai i permessi necessari per accedere ai servizi. Devi prima effettuare il login oppure regiatrarti";
  }
}