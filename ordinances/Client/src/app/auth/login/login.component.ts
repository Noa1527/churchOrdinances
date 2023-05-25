// login.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Vous pouvez récupérer les valeurs de formulaire ici et les utiliser pour vous connecter
      console.log(form.value);
    }
  }
}
