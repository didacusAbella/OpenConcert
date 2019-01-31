import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ProfileService } from './profile.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  host: { 'class': 'p-col-8' }
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public cities: SelectItem[];
  public allGenres: SelectItem[];

  constructor(private formBuilder: FormBuilder, private service: ProfileService) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'lastName': ['', Validators.required],
      'password': ['', Validators.required],
      'city': ['', Validators.required],
      'genres': ['', Validators.required]
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