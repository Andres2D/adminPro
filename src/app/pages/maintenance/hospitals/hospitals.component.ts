import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, fromEvent, Observable, Subject, Subscriber, Subscription, takeUntil } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchsService } from 'src/app/services/searchs.service';

declare var Swal;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  hospitals: Hospital[] = [];
  hospitalsTem: Hospital[] = [];
  loading: boolean = true;
  private ngUnsubscribe: Subject<Object> = new Subject();
  private searchSubs$: Observable<any>;
  @ViewChild('searchHospital', { static: true }) searchHospital: ElementRef;

  constructor(private hospitalService: HospitalService, private modalService: ModalService, private searchService: SearchsService) { }

  ngOnInit(): void {
    this.loadHospitals();
    
    this.searchSubs$ = fromEvent(this.searchHospital.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe),
      );
    
    this.searchSubs$.subscribe( () => this.search(this.searchHospital.nativeElement.value));

    this.modalService.newImage
      .pipe(
        takeUntil(this.ngUnsubscribe),
        delay(100)
      )
      .subscribe( () => this.loadHospitals());
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.loadHopitals()
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe( (hospitals) => {
        this.loading = false;
        this.hospitals = hospitals;
        this.hospitalsTem = hospitals;
      });
  }

  saveHospital(hospital: Hospital): void {
    this.hospitalService.updateHopitals(hospital._id, hospital.name)
      .subscribe( res => {
        Swal.fire( 'Updated', hospital.name, 'success');
      })
  }

  deleteHospital(hospital: Hospital): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `The hospital ${hospital.name} will be deleted` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHopitals(hospital._id)
        .subscribe( res => {
          this.loadHospitals();
          Swal.fire(
            'Deleted!',
            `${hospital.name} has been deleted.`,
            'success'
          )
        });
      }
    })   
  }

  async openCreateHospitalModal() {
    const {value = ''} = await Swal.fire({
      title: 'Add hospital',
      text: 'Input the new Hospital',
      input: 'text',
      inputPlaceholder: 'Hospital',
      showCancelButton: true
    })
    
    if(value.trim().length > 0) {
      this.hospitalService.createHopitals( value )
        .subscribe( resp => {
          this.hospitals.push(resp.hospital);
        })
    }
  }

  showModal(hospital: Hospital): void {
    this.modalService.showModal(true, 'hospitals', hospital._id, hospital.img);
  }

  search(term: string): void {
    if(term.length === 0) {
      this.hospitals = this.hospitalsTem;
      return;
    }
      
    this.searchService.search('hospitals', term)
    .subscribe( res => {
      this.hospitals = res;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
