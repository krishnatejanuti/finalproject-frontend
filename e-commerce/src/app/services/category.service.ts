import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8092/admin/category/getAll';

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCategoryByID(id:any):Observable<any> 
  {
    return this.http.get<any>(`http://localhost:8092/category/getById/${id}`);
  }

  deleteById(id:any):Observable<any> 
  {
    return this.http.delete<any>(`http://localhost:8092/admin/category/deleteById/${id}`);
  }


  putCategory(id:any,body:any):Observable<any> {
    return this.http.put<any>(`http://localhost:8092/admin/category/updateBy/${id}`, body);
  }

  postCategory(body:any):Observable<any> {
    return this.http.post<any>(`http://localhost:8092/admin/category/create`, body);
  }
}

