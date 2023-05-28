import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
// import { Gender } from 'src/app/auth/enum/gender.enum';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Gender = Gender;

  registerForm!: FormGroup;
  showAlert = false;
  alert = {
    type: '',
    message: '',
  };

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      "Eye",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/Eye.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "EyeSlash",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/EyeSlash.svg")
    );
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // gender: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.showAlert = true;
      this.alert = {
        type: 'error',
        message: 'Please fill in all required fields correctly.',
      };
      return;
    }
    console.log('registerForm', this.registerForm.value);
    
    this.authService.register(this.registerForm.value)
    .pipe(
      tap(response => {
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        this.showAlert = true;
        this.alert = {
          type: 'error',
          message: 'Something went wrong, please try again.',
        };
        return of(error);
      })
    ).subscribe();
  }
}
