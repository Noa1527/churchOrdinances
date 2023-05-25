// auth.module.ts
import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './guards/auth.guard';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path:'logout', 
    component: LogoutComponent,
    canActivate: [() => inject(AuthGuard).canActivate] 
  }
  // autres routes d'authentification...
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    // autres composants d'authentification...
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // notez l'utilisation de forChild ici
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ]
})
export class AuthModule { }
