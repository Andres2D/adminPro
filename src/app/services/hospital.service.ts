import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
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

  loadHopitals(): Observable<Hospital[]> {
    const url = `${base_url}/hospitals`;
    return this.http.get(url, this.headers)
    .pipe(
      map( (res: {ok: boolean, hospitals: Hospital[]}) => res.hospitals )
      );
  }

  createHopitals(name: string): Observable<any> {
    const url = `${base_url}/hospitals`;
    return this.http.post(url, {name}, this.headers);
  }

  updateHopitals(_id: string, name: string): Observable<any> {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.put(url, {name}, this.headers);
  }

  deleteHopitals(_id: string): Observable<any> {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
