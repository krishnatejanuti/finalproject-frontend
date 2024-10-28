import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  private isAdminRoute: boolean = false; // A flag to determine if the attempted route was an admin route
 
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Check if the route includes 'admin' to determine the context
    this.activatedRoute.url.subscribe((urlSegment: any[]) => {
      this.isAdminRoute = urlSegment.some(segment => segment.path.includes('admin'));
    });
  }
 
  // This method will navigate to either the admin login or user login based on the route
  // goToLogin() {
  //   if (this.isAdminRoute) {
  //     this.router.navigate(['/admin']);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }
}
