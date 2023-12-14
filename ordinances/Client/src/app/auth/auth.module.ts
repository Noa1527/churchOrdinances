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
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MagicLoginComponent } from './magic-login/magic-login.component';
import { VerifyMagicLoginComponent } from './magic-login/verify/verify-magic-login.component';


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
  },
  { 
    path:'magic-login', 
    component: MagicLoginComponent,
  },
  { 
    path:'verify-magic-login/:token', 
    component: VerifyMagicLoginComponent,
  }
  // autres routes d'authentification...
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    MagicLoginComponent,
    VerifyMagicLoginComponent,
    // autres composants d'authentification...
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // notez l'utilisation de forChild ici
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
  ]
})
export class AuthModule { }
