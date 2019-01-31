import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  host: { 'class': 'p-col-8' }
})
export class LoginComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  public login() :void {
    if(this.signinForm.valid) {
      console.log("Loggato");
    }
  }

}