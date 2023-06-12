import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePublicComponent } from './home-public/home-public/home-public.component';
import { ErrorPageComponent } from './views/error-page/error-page/error-page.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomePrivateComponent } from './views/home-private/home-private/home-private.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { AddMedComponent } from './views/add-med/add-med.component';
import { AllMedsComponent } from './views/all-meds/all-meds.component';
import { EditMedComponent } from './views/edit-med/edit-med.component';
import { NewOrderComponent } from './views/new-order/new-order.component';

const routes: Routes = [
  {
    path: '',
    component: HomePublicComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomePrivateComponent,
    ...canActivate(()=> redirectUnauthorizedTo('/login'))
  },
  {
    path: 'add-med',
    component: AddMedComponent,
    ...canActivate(()=> redirectUnauthorizedTo('/login'))
  },
  {
    path: 'all-meds',
    component: AllMedsComponent,
    ...canActivate(()=> redirectUnauthorizedTo('/login'))
  },
  {
    path: 'edit-med/:id',
    component: EditMedComponent,
    ...canActivate(()=> redirectUnauthorizedTo('/login'))
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
    ...canActivate(()=> redirectUnauthorizedTo('/login'))
  },
  {
    path: '**',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
