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
  colorsList: Array<string> = [];
  colorPotency = 340;

  constructor(
    private user: UserService
  ) { }

  protected generateRandomColor = () => {
    const red = Math.floor(Math.random() * (this.colorPotency / 3));
    const green = Math.floor(Math.random() * (this.colorPotency / 3));
    const blue = this.colorPotency - red - green;

    this.colorsList.push(`rgb(${red}, ${green}, ${blue})`);

    return this.colorsList;
  };

  protected generateColorTimes = (times: number) => {
    for (let i = 0; i < times; i++) this.generateRandomColor();
  }

  ngOnInit(): void {
    const allUsers = this.user.getAllUsers();

    allUsers.subscribe(users => {
      this.generateColorTimes(users.length);

      this.users = users.map((user, index) => {
        return { ...user, skin: this.colorsList[index] };
      });

      console.log(this.users[0]);
      this.loaded = !0;
      this.hasUsers = !!users.length;
    });
  }
}
