import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from 'src/app/shared/services/user.service';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { GenreService } from 'src/app/shared/services/genre.service';
import { Genre } from 'src/app/shared/models/genre';

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
    private localeService: LocaleService, private genreService: GenreService) {
    this.helper = new JwtHelperService();
    this.cities = new Array();
    this.allGenres = new Array();
    this._email = this.helper.decodeToken(localStorage.getItem('secretforcreateauth')).email;
    this.profileForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
      'password': ['', Validators.required],
      'city': ['', Validators.required],
      'genres': ['', Validators.required]
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

  public editprofile(){
    if(this.profileForm.valid){
      console.log("modificato");
    }
  }
}