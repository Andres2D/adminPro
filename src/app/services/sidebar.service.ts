import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {
          title: 'Main',
          url: '/'
        },
        {
          title: 'Progressbarr',
          url: 'progress'
        },
        {
          title: 'Graphs',
          url: 'graph1'
        }
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        {
          title: 'Users',
          url: 'users'
        },
        {
          title: 'Hospitals',
          url: 'hospitals'
        },
        {
          title: 'Doctors',
          url: 'doctors'
        }
      ]
    }
  ];

  constructor() { }

}
