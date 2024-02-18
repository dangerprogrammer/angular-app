import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isSigned: any = !1;
  http = inject(HttpClient);

  getStorageStatus = () => localStorage.getItem("login");

  getAllUsers = () => this.http.get<User[]>('api/users');

  getUserById = (id: number) => {
    this.http.get<User>(`api/users/${id}`).subscribe(user => {
      console.log(user);
    });
  }

  createUser = (user: User) => this.http.post('api/users', user);

  setSigned = (status: boolean | object) => {
    this.isSigned = status ?? !this.isSigned;

    localStorage.setItem("login", JSON.stringify(this.isSigned));

    return this.isSigned;
  }

  setRedirect = (path: string) => localStorage.setItem("redirect", path);

  getRedirect = () => localStorage.getItem("redirect");
}
