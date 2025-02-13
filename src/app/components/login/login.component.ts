import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    this.apiService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); // Save JWT token
        this.router.navigate(['/dashboard']); // Redirect after login
      },
      (error) => {
        alert('Invalid login');
        console.error('Login error:', error);
      }
    );
  }


}
