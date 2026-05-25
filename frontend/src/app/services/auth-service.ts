import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?:string,
  username?:string,
  email?:string,
  role ?: string,
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject : BehaviorSubject<User | null>
  public user : Observable<User | null>
  API_URL = "http://localhost:5000/api/auth"
  constructor(public http:HttpClient,public router:Router){
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public login(email:any,password:any):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/login`,{
      email,password
    })
  }

  public setSession(userDetails:any,token:any){
    localStorage.setItem('user',JSON.stringify(userDetails));
    localStorage.setItem('tokenId',token)
    this.router.navigate(['/home'])
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('tokenId')
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public register(userDetails:any):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/register`,userDetails)
  }
}
