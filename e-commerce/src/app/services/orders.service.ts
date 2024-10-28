import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'http://localhost:8095/order/getAllOrders';

  constructor(private http:HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8095/order/getOrderUserId/${userId}`);
  }

  postOrder(body:any):Observable<any> {
    return this.http.post<any>('http://localhost:8095/order/create',body)
  }

  putOrder(status:any,id:any):Observable<any> {
    // return this.http.get<any>(`http://localhost:8095/order/updateStatus/${id}?status=${status}`);
    const url = `http://localhost:8095/order/updateStatus/${id}`;

    // Set the query parameters
    let params = new HttpParams().set('status', status);

    // Make the PUT request
    return this.http.put(url, {}, { params });
  }
}
