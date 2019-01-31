import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  host: { 'class': 'p-col-8' }
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }


}