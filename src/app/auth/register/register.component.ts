import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
declare var Swal;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSummited: boolean = false;
  public registerForm: FormGroup = this.fb.group(
    {
      name: ['AndresTest', Validators.required],
      email: ['andtest@algo.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      password2: ['123456', Validators.required],
      terms: [true, Validators.required]
    },
    {
      validators: this.equalsPasswords('password', 'password2')
    }
  );

  constructor(private fb: FormBuilder, private userService: UserService) { }

  createUser(): void {
    this.formSummited = true;
    if(this.registerForm.invalid) {
      return;
    }

    // post user
    this.userService.createUser(this.registerForm.value)
      .subscribe({
        next: (resp) => {
          console.log('user created'),
          console.log(resp)
        },
        error: (err) => {
          console.log(err),
          Swal.fire('Error', err.error.msg, 'error');
        }
    });
  }

  invalidField(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSummited ? true : false;
  }

  termValidation(): boolean {
    return !this.registerForm.get('terms').value && this.formSummited ? true : false;
  }

  invalidPasswords(): boolean {
    return this.formSummited && (this.registerForm.get('password').value !== this.registerForm.get('password2').value) ? true : false;
  }

  equalsPasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      pass1Control.value === pass2Control.value ? pass2Control.setErrors(null) : pass2Control.setErrors({notEquals: true});
    }
  }
}
