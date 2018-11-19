import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  agreement = false;

  errors;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = this._fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'passwords': this._fb.group({
        'password': [null, [Validators.required, Validators.minLength(6)]],
        'repeat': [null, [Validators.required, Validators.minLength(6)]]
      }, {
        validator: this.areEqual
      }),
      'invitation_code': [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.loading = true;

    this.authService
      .signUp(
        this.email.value,
        this.password.value,
        this.invitation_code.value
      )
      .subscribe((data) => {
        this.loading = false;
        return this.router.navigate(['/dashboard']);
      }, (err) => {
        this.loading = false;
        // this.errors = err.message;
        this.errors = '您的注册信息有误，请重新填写';
      });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('passwords.password');
  }

  get repeat() {
    return this.signupForm.get('passwords.repeat');
  }

  get passwords() {
    return this.signupForm.get('passwords');
  }

  get invitation_code() {
    return this.signupForm.get('invitation_code');
  }

  areEqual(g: FormGroup) {
    return g.get('password').value === g.get('repeat').value
      ? null : { 'areEqual': true };
  }

  checkAgreement() {
    if (this.agreement === false) {
      this.agreement = true;
    } else if (this.agreement === true) {
      this.agreement = false;
    }
    // console.log(this.agreement);
  }
}
