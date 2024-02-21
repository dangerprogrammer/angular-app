import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isSigned: any = !1;
  colorsList: Array<string> = ['#94f', '#fa0', '#5c2'];
  // colorPotency = 440;
  http = inject(HttpClient);

  getStorageStatus = () => localStorage.getItem("login");

  getAllUsers = () => this.http.get<User[]>('nest-api/users');

  getUserById = (id: number) => this.http.get<User>(`nest-api/users/${id}`);

  // protected generateRandomColor = () => {
  //   let red = this.randomBetween({ min: (this.colorPotency - 255) / 2, max: Math.min(255, this.colorPotency / 2) });
  //   let green = this.randomBetween({ min: (this.colorPotency - 255) / 2, max: Math.min(255, this.colorPotency / 2) });
  //   let blue = this.colorPotency - red - green;

  //   this.colorsList.push(`rgb(${red}, ${green}, ${blue})`);
  // };

  // randomBetween = ({min = 0, max = 1}) => Math.floor(Math.random() * (max - min)) + min;

  // generateColorTimes = (times: number) => {
  //   for (let i = 0; i < times; i++) this.generateRandomColor();
  // }

  getUserByEmail = (email: string): Observable<any> =>
    this.getAllUsers().pipe(map(users => {
      const user = users.find(({ email: userEmail }: any) => userEmail == email);

      return user;
    }));

  createUser = (user: User) => this.http.post('nest-api/users', user);

  setSigned = (status: boolean | User) => {
    this.isSigned = status ?? !this.isSigned;

    if (status) {
      this.setExists(!1);
      this.removeRedirect();
    };

    localStorage.setItem("login", JSON.stringify(this.isSigned));

    return this.isSigned;
  }

  convertToRGB(hexa: string) {
    const color = hexa.slice(1), { length: colorLength } = color;

    if (!(colorLength % 3) || !(colorLength % 4)) {
      const isAlpha = !(colorLength % 4), repeat = Math.ceil(colorLength / 4), splittedColor = [];

      for (let i = 0; i < colorLength; i += repeat) {
        const char = color.substring(i, i + repeat), increment = 2 - repeat;
        let fullChar = char;

        while (fullChar.length < (increment + 1)) fullChar += char;

        const evalChar = eval(`0x${fullChar}`), divisor: number = +(splittedColor.length % 4 != 3) || 0xff;

        splittedColor.push(evalChar / divisor);
      };

      const fullColor = `rgb${isAlpha ? 'a' : ''}(${splittedColor.join(', ')})`;

      return fullColor;
    } else return "hexa invalido!";
  };

  setExists = (status: boolean | User) => status ? localStorage.setItem("exist-user", JSON.stringify(status)) : localStorage.removeItem("exist-user");

  getExists = () => localStorage.getItem("exist-user");

  setRedirect = (path: string) => localStorage.setItem("redirect", path);

  protected removeRedirect = () => localStorage.removeItem("redirect");

  getRedirect = () => localStorage.getItem("redirect");
}
