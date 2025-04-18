import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  onLogin(form: NgForm) {
    console.log('Login form submitted', form.value);
    // Here you would typically handle the login logic, such as calling a service to authenticate the user.
  }
}
