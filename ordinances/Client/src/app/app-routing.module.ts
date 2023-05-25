import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
// import { ProfileComponent } from './auth/profile/profile.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

const routes: Routes = [

  // 1. default route
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },

  { 
    path: 'auth', 
    loadChildren: () => 
    import('src/app/auth/auth.module').then(
      m => m.AuthModule
    ) 
  },
  // 2. routes without authentication
  // { 
  //   path: 'login', 
  //   component: LoginComponent 
  // },
  // { 
  //   path: 'signup', 
  //   component: SignupComponent 
  // },
  
  // 3. routes with authentication
  // { 
  //   path: 'profile', 
  //   component: ProfileComponent, 
  //   canActivate: [() => inject(AuthGuard).canActivate],
  // },

  // 4. Admin routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
