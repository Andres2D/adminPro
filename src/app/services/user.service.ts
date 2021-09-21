import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterUser } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';
declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(private http: HttpClient, private ngZone: NgZone, private router: Router) { 
    this.googleInit();
  }

  get _id(): string {
    return this.user._id || '';
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: environment.google_id,
          cookiepolicy: 'single_host_origin'
        });
        resolve();
      });
    })
  }

  createUser(formData: RegisterUser) {
    return this.http.post(`${ base_url }/users`, formData).
      pipe(
        tap((res: any) => {
          this.saveToken(res.token);
        })
      );
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((res: any) => {
        this.saveToken(res.token);
      })
    );
  }

  loginUserGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((res: any) => {
        this.saveToken(res.token);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken() || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
    .pipe(
      map((res: any) => {
        const { email, google, name, role, _id, img = ''} = res.user;
        this.user = new User(name, email, '', google, role, _id, img);
        this.saveToken(res.token);
        return true;
      }),
      catchError( err => of(false))
    );
  }

  updateProfile(data: { email: string, name: string, role: string }) {

    data = {
      ...data,
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${this._id}`, data,{
      headers: {
        'x-token': this.getToken()
      }
    });
  }

  logout(){
    this.removeToken();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  removeEmail(): void {
    localStorage.removeItem('email');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  } 

}
