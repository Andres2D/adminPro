import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user: User;
  @ViewChild('searchTerm') searchTerm: ElementRef;

  constructor(private userService: UserService, private router: Router) { 
    this.user = userService.user;
  }

  search(): void {
    const term = this.searchTerm.nativeElement.value;
    if(term.length === 0) {
      return;
    }
    
    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }

  logout(): void {
    this.userService.logout();
  }

}
