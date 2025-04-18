import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  onSignup(form: NgForm) {
    console.log('Signup form submitted', form.value);
    // Here you would typically handle the login logic, such as calling a service to authenticate the user.
  }
}
