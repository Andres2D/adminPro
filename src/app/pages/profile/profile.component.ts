import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
declare const Swal;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User;
  imageUpload: File;
  imgTemp: any = '';

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private fileUploadService: FileUploadService) {
    this.user = this.userService.user;
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });

    if(this.user.google) {
      this.profileForm.get('email').disable();
    }

  }

  updateProfile(): void {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value)
      .subscribe({
        next: () => {
          // TODO: add sweet alert saving success
          const { name, email } = this.profileForm.value;
          this.user.name = name;
          this.user.email = email;

          Swal.fire('Saved', 'Changes saved successfull', 'success');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
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

  uploadImage(): void {
    this.fileUploadService.updatePhoto(this.imageUpload, 'users', this.user._id)
      .then( img => {
        this.user.img = img;
        Swal.fire('Saved', 'Image updated successfull', 'success');
      })
      .catch( err => {
        Swal.fire('Error', 'Error updating the image', 'error');
      })
  }

}
