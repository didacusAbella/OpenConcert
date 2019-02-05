import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  host: { 'class': 'p-col-8' }
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public cities: SelectItem[];

  constructor(private formBuilder: FormBuilder, private service: SignupService, private router: Router) {
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
      this.service.signupUser(createdUser).subscribe(token => {
        console.log("Utente creato con successo");
        this.router.navigate(['/events']);
      });
    }
  }

}