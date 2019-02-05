import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  host: { 'class': 'p-col-8' }
})
export class LoginComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  public login() :void {
    if (this.signinForm.valid) {
      this.loginService.logUser(this.signinForm.value.email, this.signinForm.value.password).subscribe(result => {
        if(result.auth === true) {
          localStorage.setItem('secretforcreateauth', result.token);
          this.router.navigate(['/profile']);
        } else {
          console.log("Errore autenticazione");
        }
      })
    }
  }
}