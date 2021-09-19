import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterUser } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
      tap((res: any) => {
        this.saveToken(res.token);
      }),
      map( res => true),
      catchError( err => of(false))
    );
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

}
