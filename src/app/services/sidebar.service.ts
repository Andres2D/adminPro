import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuObs$: BehaviorSubject<any> = new BehaviorSubject([]); 

  loadMenu(): void {
    this.menuObs$.next(JSON.parse(localStorage.getItem('menu')) || []);
  }

}
