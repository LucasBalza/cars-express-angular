import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CarListComponent } from './components/cars/car-list/car-list.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { CarCreateComponent } from './components/cars/car-create/car-create.component';
import { CarEditComponent } from './components/cars/car-edit/car-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'cars',
    component: CarListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'cars/new',
    component: CarCreateComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'cars/:id',
    component: CarDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'cars/:id/edit',
    component: CarEditComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/cars' }
];
