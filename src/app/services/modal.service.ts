import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url; 
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalControl: Subject<boolean> = new Subject();
  type: 'users'|'hospitals'|'doctors'
  id: string;
  img: string;

  newImage: Subject<null> = new Subject();

  private _hideModal: boolean = true;

  get hideModal(): boolean {
    return this._hideModal;
  }

  showModal(show: boolean, type: 'users'|'hospitals'|'doctors' = 'users', id: string = '', img: string = 'no-img'): void {
    this.modalControl.next(show);
    if(show) {
      this.type = type;
      this.id = id;
      
      if(img.includes('https')) {
        this.img = img;
      }else{
        this.img = `${base_url}/upload/${type}/${img}`;
      }
    }

  }

}
