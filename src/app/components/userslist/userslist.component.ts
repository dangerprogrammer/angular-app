import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss'
})

class UserslistComponent implements OnInit {
  users!: User[];
  hasUsers: boolean = !1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(list => {
      this.users = list;
      this.hasUsers = !!list.length;
    });
  }
}

export { UserslistComponent };