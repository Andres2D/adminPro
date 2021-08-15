import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  obs$: Subscription;

  constructor() {
    
    // this.returnObserver().pipe(
    //   retry(2)
    // ).subscribe(
    //   value => console.log('Subs: ', value),
    //   error => console.warn('Error: ', error),
    //   () => console.info('Obs completed')
    // );

    this.obs$ = this.returnInterval()
      .subscribe(console.log);
   }

   returnInterval(): Observable<number> {

     return interval(100)
      .pipe(
        map( val => val + 1),
        filter( val => ( val % 2 === 0 ) ? true : false),
      );
   }

   returnObserver(): Observable<number> {
    let i = -1;
    
    return new Observable<number>( observer => {

      const interval = setInterval( () => {
        i++;
        observer.next(i);

        if(i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if( i === 2) {
          observer.error('Error on 2');
        }

      }, 1000);

    });
   }

   ngOnDestroy() {
     this.obs$.unsubscribe();
   }

}
