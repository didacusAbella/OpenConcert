import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  host: { 'class': 'p-col-8' }
})
export class LoginComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  public login() :void {
    if (this.signinForm.valid) {
      this.auth.login(this.signinForm.value.email, this.signinForm.value.password).subscribe( token => {
        if(token.auth){
          localStorage.setItem('secretforcreateauth', token.token);
          this.router.navigate(['/events']);
        }
      })
    }
  }
}