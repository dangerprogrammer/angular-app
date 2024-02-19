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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {
    this.userId = this.route.snapshot.paramMap.get("user-id");
  }

  ngOnInit(): void {
    if (!this.homeUser) this.user.getUserById(+this.userId).subscribe(user => {
      this.routeUser = user;

      this.anyUser = this.homeUser || this.routeUser;
      console.log(this.anyUser);
    });
  }

  goToUser() {
    this.router.navigate([`/users/${this.homeUser?.id}`])
  }
}
