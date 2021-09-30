import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctors.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styleUrls: ['./searchs.component.css']
})
export class SearchsComponent implements OnInit {

  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private searchService: SearchsService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({term}) => {
        this.globalSearch(term);
      })
  }

  globalSearch(term: string): void {
    this.searchService.globalSearch(term)
      .subscribe({
        next: (res: any) => {
          this.users = res.users;
          this.hospitals = res.hospitals;
          this.doctors = res.doctors;
        }
      })
  }

  goToMaintenance(id: string): void {
    this.router.navigateByUrl(`/dashboard/doctor/${id}`);
  }

}
