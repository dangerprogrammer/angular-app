import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  @Input() homeUser?: User;
  routeUser?: User;
  anyUser?: User;
  userId?: any;
  isMe: boolean = !1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {
    this.userId = this.route.snapshot.paramMap.get("user-id");
  }

  ngOnInit(): void {
    const allUsers = this.user.getAllUsers(),
          me = JSON.parse(this.user.getStorageStatus() as string);

    allUsers.subscribe(users => {
      if (!this.homeUser) {
        if (this.userId) this.user.getUserById(+this.userId).subscribe(user => {
          const userIndex = users.findIndex(({ id }) => id == user.id);
  
          user = { ...user, skin: this.user.colorsList[userIndex % this.user.colorsList.length] };
  
          this.isMe = me.id === user.id;
          this.routeUser = user;
          this.anyUser = user;
        });
      } else {
        const userIndex = users.findIndex(({ id }) => id == this.homeUser?.id);

        this.homeUser = { ...this.homeUser, skin: this.user.colorsList[userIndex % this.user.colorsList.length]};

        this.isMe = me.id === this.homeUser.id;
        this.anyUser = this.homeUser;
      };
    });
  }

  goToUser() {
    this.router.navigate([`/users/${this.homeUser?.id}`])
  }
}
