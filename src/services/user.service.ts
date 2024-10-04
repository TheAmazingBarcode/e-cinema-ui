import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../model/User";
import config from "../../public/api.json"
import {AuthDto} from "../model/AuthDto";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient) { }

  public signUp(user:User):Observable<User>{
    return this.client.post<User>(config.base_url+config.port+config.user+config.signup,user);
  }

  public logIn(auth:AuthDto):Observable<User>{
    return this.client.post<User>(config.base_url+config.port+config.user+config.login,auth).pipe(catchError(error => {
      this.incorrectDetails();
      return throwError(()=> new Error('Incorrect details, try again'))
    }));
  }

  public addToCatalog(map:Map<String,Number>):Observable<String>{
    return this.client.post<String>(config.base_url+config.port+config.user+config.add,map).pipe(catchError(error => {
      this.possibleDuplicate();
      return throwError(()=> new Error('Possible duplicate reservation, try again'))
    }));
  }

  private incorrectDetails() {
    Swal.fire({
      title: "Incorrect details",
      text: "Check your email and password and try again.",
      icon: "error",
      background: "#010013",
      confirmButtonText: 'Ok',
      confirmButtonColor: '#9e0404',
    })
  }

  private possibleDuplicate(){
    Swal.fire({
      title: "Duplicate Reservation",
      text: "Check if you have already reserved this projection",
      icon: "error",
      background: "#010013",
      confirmButtonText: 'Ok',
      confirmButtonColor: '#9e0404',
    })
  }
}
