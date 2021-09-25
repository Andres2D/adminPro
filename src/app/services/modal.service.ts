import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _hideModal: boolean = true;

  get hideModal(): boolean {
    return this._hideModal;
  }

  openModal(): void {
    this._hideModal = false;
  }

  closeModal(): void {
    this._hideModal = true;
  }

}
