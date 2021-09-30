import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  menuItems: any[];
  user: User;
  ngUnsubscribe: Subject<Object> = new Subject();

  constructor(private sideBarService: SidebarService, private userService: UserService) {
    this.user = userService.user;
   }

  ngOnInit() {
    this.sideBarService.menuObs$
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe({
        next: (menu) => {
          console.log(menu);
          this.menuItems = menu;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
