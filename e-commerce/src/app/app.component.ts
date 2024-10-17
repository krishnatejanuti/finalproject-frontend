import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce';

  constructor(private r:Router){}

  isAdmin(){
    let userRole = localStorage.getItem('userRole');

    if(userRole == 'admin'){
      return true;
    } else {
      return false;
    }

  }

  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.r.navigate(['/login']);
  }
}
