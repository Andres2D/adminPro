import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
declare var Swal;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  totalUsers: number = 0;
  users: User[] = [];
  usersTemp: User[] = [];
  from: number = 0;
  loading: boolean = true;
  private ngUnsubscribe: Subject<Object> = new Subject();
  searchObs$: Observable<any>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  get userId() {
    return this.userService._id;
  }

  constructor( private userService: UserService, 
    private searchService: SearchsService, 
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.searchObs$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      );

    this.searchObs$
    .subscribe(() => {
      this.search(this.searchInput.nativeElement.value);
    }); 

    this.modalService.newImage
    .pipe(
      takeUntil(this.ngUnsubscribe),
      delay(100)
    )
    .subscribe( () => {
      this.loadUsers();
    })
  }
  
  loadUsers() : void {
    this.loading = true;
    this.userService.loadUsers(this.from)
    .subscribe( ({total, users}) => {
      this.totalUsers = total;
      this.usersTemp = users;
      this.users = users;
      this.loading = false;
    });
  }

  changePage( value: number ): void {
    this.from += value;

    if(this.from < 0 ) {
      this.from = 0;
    } else if(this.from > this.totalUsers) {
      this.from -= value; 
    }
    this.loadUsers();
  }

  search(term: string): void {
    if(term.length === 0) {
      this.users = this.usersTemp;
      return;
    }
      
    this.searchService.search('users', term)
    .subscribe( res => {
      this.users = res;
    });
  }

  deleteUser(user: User): void {

    if(user._id === this.userService._id) {
      return;
    }

    Swal.fire({
      title: 'Delete User',
      text: `The user ${user.name} will be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe( resp =>  {
          Swal.fire(
          'User deleted',
          `${user.name} deleted successfull`,
          'success'
          );
          this.loadUsers();
        });
      }
    })
  }

  changeRole(user: User): void {
    this.userService.saveUser(user)
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe( res => {
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  showModal(user: User): void {
    this.modalService.showModal(true, 'users', user._id, user.img);
  }
}
