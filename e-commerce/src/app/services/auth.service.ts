import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8091/auth/user/login'; // Replace with your actual backend API
 
  constructor(private http: HttpClient) {}
 
  login(userName: string, password: string): Observable<string> {
    return this.http.post(this.loginUrl, { userName, password }, { responseType: 'text' }).pipe(
      map(response => {
        console.log('Login response:', response); // Log the response
 
        // Assuming the response is the token itself
        localStorage.setItem('authToken', response);
        return response;
      })
    );
  }
 
  
  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.username || null;
        console.log(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
}