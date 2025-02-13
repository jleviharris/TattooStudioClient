import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('token'); // Remove stored token
    this.router.navigate(['/login']); // Redirect to login page
  }
}
