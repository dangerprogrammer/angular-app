import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/userslist/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isSigned: any = !1;
  http!: HttpClient;

  getStorageStatus = () => localStorage.getItem("login");

  getUsers = () => {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(usersList => {
      console.log(usersList);
    })
  }

  setSigned = (status: any) => {
    this.isSigned = status ?? !this.isSigned;

    localStorage.setItem("login", this.isSigned);

    return this.isSigned;
  }
}