import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctors.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get headers() {
    return {
      headers: {
        'x-token': this.getToken()
      }
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  loadDoctors(): Observable<Doctor[]> {
    const url = `${base_url}/doctors`;
    return this.http.get(url, this.headers)
    .pipe(
      map( (res: {ok: boolean, doctors: Doctor[]}) => res.doctors )
      );
  }

  loadDoctor(id: string): Observable<Doctor> {
    const url = `${base_url}/doctors/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map( (res: {ok: boolean, doctor: Doctor}) => res.doctor )
      );
  }

  createDoctor(doctor: {name: string, hospital: string}): Observable<any> {
    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor): Observable<any> {
    const url = `${base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(_id: string): Observable<any> {
    const url = `${base_url}/doctors/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
