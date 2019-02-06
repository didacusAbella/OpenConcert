import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  host: { 'class': 'p-col-8' }
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public cities: SelectItem[];

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService) {
    this.cities = [
      { label: "Napoli", value: "Napoli" },
      { label: "Avellino", value: "Avellino"},
      { label: "Benevento", value: "Benevento" },
      { label: "Caserta", value: "Caserta"},
      { label: "Salerno", value: "Salerno" }
    ]
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'city': ['', Validators.required]
    });
  }

  public registerUser() {
    if(this.signupForm.valid) {
      let createdUser = new User(this.signupForm.value);
      this.auth.signup(createdUser).subscribe(token => {
        if (token.auth){
          localStorage.setItem('secretforcreateauth', token.token);
          this.router.navigate(['/events']);
        }
      })
    }
  }

}