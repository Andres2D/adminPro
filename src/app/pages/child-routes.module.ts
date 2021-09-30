import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchsComponent } from './searchs/searchs.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: {
      title: 'Progress'
    }
  },
  {
    path: 'graph1',
    component: Graph1Component,
    data: {
      title: 'Graph'
    }
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users'
    },
    canActivate: [AdminGuard]
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: {
      title: 'Hospitals'
    }
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: {
      title: 'Doctors'
    }
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    data: {
      title: 'Doctor'
    }
  },
  {
    path: 'search/:term',
    component: SearchsComponent,
    data: {
      title: 'Searchs'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
