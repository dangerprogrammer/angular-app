import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  users!: User[];
  loaded: boolean = !1;
  hasUsers: boolean = !1;

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
    const allUsers = this.user.getAllUsers();

    allUsers.subscribe(users => {
      this.users = users;

      this.loaded = !0;
      this.hasUsers = !!users.length;
    });
  }
}
