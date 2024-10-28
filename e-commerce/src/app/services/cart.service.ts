import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService 
{

  userId = localStorage.getItem('userId');

  constructor(private http: HttpClient) { }

  getCartByUserID(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8094/cart/getByUserId/${this.userId}`);
  }

  removeItem(id:any):Observable<any>{
    return this.http.delete(`http://localhost:8094/cart/remove/${this.userId}/${id}`);
  }
}


