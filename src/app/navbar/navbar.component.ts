import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  email: string;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // Update session states initially
    // and whenever there is a state change
    this.updateSessionState();
    this.authService.sessionStateChanged$
      .subscribe(() => {
        this.updateSessionState();
        console.log('updateSessionState');
      });
  }

  updateSessionState() {
    if (localStorage.getItem('access_token')) {
      this.email = localStorage.getItem('email');
    } else {
      delete this.email;
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }

}
