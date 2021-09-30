import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctors.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
declare var Swal;
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: Hospital[] = [];
  selecteHospital: Hospital;
  selectedDoctor: Doctor;

  constructor(private fb: FormBuilder, 
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => this.loadDoctor(id));

    this.doctorForm = this.fb.group({
      'name': ['', Validators.required],
      'hospital': ['', Validators.required]
    });

    this.loadHospitals();

    this.doctorForm.get('hospital').valueChanges
      .subscribe( (hispitalId) => {
        this.selecteHospital = this.hospitals.find( h => h._id === hispitalId);
      })
  }

  loadDoctor(id: string): void {
    if(id === 'new') {
      return;
    }

    this.doctorService.loadDoctor(id)
    .pipe(
      delay(100)
    )
      .subscribe({
        next: (doctor) => {
          const {name, hospital: {_id}} = doctor;
          this.selectedDoctor = doctor;
          this.doctorForm.setValue({name, hospital: _id});
        },
        error: () => {
            this.router.navigateByUrl(`/dashboard/doctors`);
        }
      });
  }

  loadHospitals(): void {
    this.hospitalService.loadHopitals()
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      });
  }

  saveDoctor(): void {
    const {name} = this.doctorForm.value;
    if(this.selectedDoctor) {
      const doctorData = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }
      this.doctorService.updateDoctor(doctorData)
        .subscribe( res => {
          Swal.fire('Updated', `${name} updated successfull`, 'success');
        });
    }else{
      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe((res: any) => {
          Swal.fire('Created', `${name} created successfull`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${res.doctor._id}`);
        })
    }

  }

}
