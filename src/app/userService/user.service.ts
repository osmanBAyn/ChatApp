import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  login(email: string, password: string) {
   return this.http.get('http://localhost:3000/login', {params: {email:email, password: password}})
  }
  register(email: string, username: string, password: string)  {
    return this.http.post('http://localhost:3000/register', {email, password, username});
  }
}
