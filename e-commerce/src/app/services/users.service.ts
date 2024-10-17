import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: string = 'http://localhost:8091/admin/user/getAllUsers'

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
