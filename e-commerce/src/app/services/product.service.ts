import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService 
{

  private getAllapiUrl = 'http://localhost:8092/admin/product/getAllProducts';

   //private deleteUrl = 'http://localhost:8092/admin/product';

  constructor(private http: HttpClient) { }

  userID = localStorage.getItem('userId');

  getData(): Observable<any> {
    return this.http.get<any>(this.getAllapiUrl);
  }

  getProductByID(id:any): Observable<any> {
    return this.http.get<any>(`http://localhost:8092/product/getById/${id}`)
  }

  deleteProduct(id:any){
    return this.http.delete(`http://localhost:8092/admin/product/deleteById/${id}`);
  }

  postProduct(body:any){
    return this.http.post('http://localhost:8092/admin/product/create',body);
  }

  putProduct(id:Number,body:any){
    return this.http.put(`http://localhost:8092/admin/product/updateById/${id}`,body);
  }
}

