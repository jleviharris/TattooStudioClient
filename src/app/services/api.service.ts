import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Example: Fetch Users
  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Making API request to:", this.apiUrl, "with token:", token);
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user, this.httpOptions).pipe(
      catchError((error) => {
        if (error.status === 409) {
          return throwError(() => new Error('A user with this email already exists.'));
        }
        return throwError(() => new Error('Failed to add user.'));
      })
    );
  }


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }

}
