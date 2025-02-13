import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core'; //  Import ChangeDetectorRef
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoutComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    role: 'TattooArtist'
  };

  private apiService = inject(ApiService);
  private cdRef = inject(ChangeDetectorRef); //  Inject ChangeDetectorRef

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Users loaded:', this.users); //  Debugging output
        this.cdRef.detectChanges(); //  Force change detection
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.apiService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user.rowKey !== userId); //  Remove from UI
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }



  addUser(): void {
    if (!this.newUser.firstName || !this.newUser.lastName || !this.newUser.email || !this.newUser.passwordHash) {
      alert('All fields are required!');
      return;
    }

    this.apiService.addUser(this.newUser).subscribe(
      (newUser) => {
        this.users.push(newUser);
        this.newUser = { firstName: '', lastName: '', email: '', passwordHash: '', role: 'TattooArtist' };
        this.cdRef.detectChanges(); // ✅ Ensure UI updates immediately
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }
}
