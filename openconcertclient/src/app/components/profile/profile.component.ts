import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/api';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from 'src/app/shared/services/user.service';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { GenreService } from 'src/app/shared/services/genre.service';
import { Genre } from 'src/app/shared/models/genre';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  host: { 'class': 'p-col-8' }
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public cities: SelectItem[];
  public allGenres: Genre[];
  public userGenres: Genre[];
  public helper: JwtHelperService;
  private _email: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private localeService: LocaleService, private genreService: GenreService, 
    private message: MessageService, private router: Router) {
    this.helper = new JwtHelperService();
    this.cities = new Array();
    this.allGenres = new Array();
    this._email = this.helper.decodeToken(localStorage.getItem('secretforcreateauth')).email;
    this.profileForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
      'password': ['', Validators.required],
      'city': ['', Validators.required],
      'genres': ['',]
    });
  }

  ngOnInit(): void {
    this.localeService.getCities().subscribe(allCities => allCities.forEach(city => this.cities.push({ label: city, value: city })));
    this.genreService.allGenres().subscribe(genres => this.allGenres = genres);
    this.userService.getUserGenres(this._email).subscribe(genres => this.userGenres = genres);
    this.userService.findUser(this._email).subscribe(user => {
      this.profileForm.get('name').setValue(user.name);
      this.profileForm.get('lastname').setValue(user.lastname);
      this.profileForm.get('password').setValue(user.password);
      this.profileForm.get('city').setValue(user.city);
    })
  }

  public editProfile(){
    if(this.profileForm.valid){
      let user = new User(this.profileForm.value);
      user.email = this._email;
      this.userService.updateUser(user).subscribe(updated => {
        if(updated){
          this.router.navigate(['/events']);
        }
      })
    }
  }

  public addGenre(event) {
    this.userService.addUserGenre(this._email, new Genre(event.items[0])).subscribe(updated => {
      if(updated) {
        this.message.add({ severity: "success", detail: "Genere Aggiunto ai preferiti", summary: "Aggiornamento Successo"});
      }
    })
  }

  public removeGenre(event) {
    let genre = event.items[0].genre;
    this.userService.removeUserGenre(this._email, genre).subscribe(removed => {
      if(removed) {
        this.message.add({ severity: "success", detail: "Genere Rimosso dai preferiti", summary: "Rimozione Successo"});
      }
    });
  }
}