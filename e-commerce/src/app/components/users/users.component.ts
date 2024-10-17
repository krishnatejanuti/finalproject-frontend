import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = null;

  constructor(private userService:UsersService) { }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data)=> {
      this.users = data;
      console.log(data);
    }
    )
  }
}
