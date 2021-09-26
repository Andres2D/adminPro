import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  get headers() {
    return {
      headers: {
        'x-token': this.getToken()
      }
    }
  }

  private transformUsers(results: any[]): User[] {
    return results.map( user => new User(user.name, user.email, '', user.google, user.role, user._id, user.img));
  }

  search(type: 'users' | 'doctors' | 'hospitals', term: string): Observable<any> {
    const url = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get(url, this.headers)
     .pipe(
       map( (resp: any) => {
         switch (type) {
           case 'users':
             return this.transformUsers(resp.results);
             break;
          case 'hospitals':
            return resp.results;
             default:
               break;
              }
      }),
      debounceTime(3000)
     )
  }

}
