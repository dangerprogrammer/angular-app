import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../interfaces/cep';

@Injectable({
  providedIn: 'root'
})
export class FindCpfService {
  constructor(private http: HttpClient) {}

  getCEP = (cep: Cep) => this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
}