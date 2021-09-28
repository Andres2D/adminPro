import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { Doctor } from 'src/app/models/doctors.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchsService } from 'src/app/services/searchs.service';
declare var Swal;
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  doctors: Doctor[] = [];
  doctorsTemp: Doctor[] = [];
  ngUnsubscribe: Subject<Object> = new Subject();
  searchDr$: Observable<any>;
  loading: boolean = true;
  @ViewChild('searchDr', {static: true}) searchDr: ElementRef;

  constructor(private doctorService: DoctorService, 
    private searchService: SearchsService, 
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadDoctors();

    this.searchDr$ = fromEvent(this.searchDr.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      );
    
    this.searchDr$.subscribe(() => {
      this.search(this.searchDr.nativeElement.value);
    });

    this.modalService.newImage
      .pipe(
        takeUntil(this.ngUnsubscribe),
        delay(100)
      )
      .subscribe( () => this.loadDoctors());
  }

  loadDoctors(): void {
    this.loading = true;
    this.doctorService.loadDoctors()
      .subscribe( res => {
        this.doctors = res;
        this.doctorsTemp = res;
        this.loading = false;
      });
  }

  search(term: string): void {
    if(term === '') {
      this.doctors = this.doctorsTemp;
      return;
    }

    this.searchService.search('doctors', term)
      .subscribe( (res) => {
        this.doctors = res;
      });
  }

  showModal(doctor: Doctor): void {
    this.modalService.showModal(true, 'doctors', doctor._id, doctor.img);
  }

  deleteDoctor(doctor: Doctor): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `The doctor ${doctor.name} will be deleted` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id)
        .subscribe( res => {
          this.loadDoctors();
          Swal.fire(
            'Deleted!',
            `${doctor.name} has been deleted.`,
            'success'
          )
        });
      }
    })   
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
