import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Data, Router } from '@angular/router';
import { filter, map, Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent implements OnDestroy {

  title: string = '';
  titleSubs$: Subscription;
  private unSubscriber: Subject<Object> = new Subject();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.titleSubs$ = this.getRouteArguments()
                          .pipe(
                            takeUntil(this.unSubscriber)
                          )
                          .subscribe( ({title}) => {
                            console.log(title);
                            
                            this.title = title;
                            document.title = `AdminPro - ${title}`;
                          })
   }

  getRouteArguments(): Observable<Data> {
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data)
      );
  }

  ngOnDestroy(): void {
    this.unSubscriber.next(null);
    this.unSubscriber.complete();
  }

}
