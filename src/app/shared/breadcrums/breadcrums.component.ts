import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent implements OnDestroy {

  pageTitle: string = '';
  titleSubs$:Subscription;

  constructor( private router: Router ) { 
    this.titleSubs$ = this.getArgRoute();
  }

  getArgRoute() {
    return this.router.events
      .pipe(
        filter( (event) => event instanceof ActivationEnd ? true : false),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ? true : false),
        map( (event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe( ({title}) => {
        this.pageTitle = title; 
        document.title = `AdminPro - ${title}`;
      });
  }

  ngOnDestroy() {
    this.titleSubs$.unsubscribe();
  }


}
