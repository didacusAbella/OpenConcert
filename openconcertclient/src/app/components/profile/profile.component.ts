import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ProfileService } from './profile.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  host: { 'class': 'p-col-8' }
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public cities: SelectItem[];
  public allGenres: SelectItem[];
  public helper: JwtHelperService;

  constructor(private formBuilder: FormBuilder, private service: ProfileService) {
    this.helper = new JwtHelperService();
    this.profileForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
      'password': ['', Validators.required],
      'city': ['', Validators.required],
      'genres': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let email = this.helper.decodeToken(localStorage.getItem('secretforcreateauth')).email;
    this.service.loadUser(email).subscribe(user => {
      this.profileForm.patchValue({ 
        name: user.name, lastname: user.lastname, password: user.password,
        city: user.city
      })
    });
    this.cities = this.service.loadCities();
    this.allGenres = this.service.loadGenres();
  }

  public editprofile(){
    if(this.profileForm.valid){
      console.log("modificato");
    }
  }
}