import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
declare var Swal;
@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit ,OnDestroy {
  showModal: boolean = false;
  ngUnsubscribe: Subject<Object> = new Subject();
  imageUpload: File;
  imgTemp: any = '';

  get userImage(){
    return this.modalService.img;
  }

  constructor(private modalService: ModalService, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.modalService.modalControl
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe( (show: boolean) => {
      this.showModal = show;
    });
  }

  closeModal(): void {
    this.imgTemp = null;
    this.modalService.showModal(false);
  }

  changeImage(file: File): void{
    this.imageUpload = file;
    if(!file){
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  uploadImage(): void {
    const id = this.modalService.id;
    const type = this.modalService.type;

    this.fileUploadService.updatePhoto(this.imageUpload, type, id)
      .then( img => {
        Swal.fire('Saved', 'Image updated successfull', 'success');
        this.closeModal();
        this.modalService.newImage.next(null);
      })
      .catch( err => {
        Swal.fire('Error', 'Error updating the image', 'error');
      })
  }

}
