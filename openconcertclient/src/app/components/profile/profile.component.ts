import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from 'src/app/shared/services/user.service';

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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
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
    this.userService.findUser(email).subscribe(user => {
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