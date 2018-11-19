import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  errors;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.loading = true;

    this.authService
      .logIn(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .subscribe((data) => {
        this.loading = false;
        return this.router.navigate(['/dashboard']);
      }, (err) => {
        this.loading = false;
        // this.errors = err.message;
        this.errors = '您输入的邮箱或密码错误';
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
