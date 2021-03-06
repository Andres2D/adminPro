import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare const Swal;
declare const gapi;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth2: any;
  public loginForm: FormGroup = this.fb.group(
    {
      email: [this.userService.getEmail() || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    }
  );

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    this.userService.loginUser(this.loginForm.value)
      .subscribe({
        next: (resp) => {
          if(this.loginForm.get('remember').value) {
            this.userService.setEmail(this.loginForm.get('email').value);
          }else{
            this.userService.removeEmail();
          }
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
    })
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.userService.loginUserGoogle(id_token).subscribe({
            next: () => {
              this.ngZone.run(() => {
                this.router.navigateByUrl('/');
              })
            }
          });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
