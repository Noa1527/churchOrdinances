import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path:'home', 
    component: HomeComponent,
    canActivate: [() => inject(AuthGuard).canActivate] 
  }
  // autres routes d'authentification...
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // register the routes
  ]
})
export class HomeModule { }
