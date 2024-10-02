import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Genre} from "../model/Genre";
import config from "../../public/api.json"

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private client:HttpClient) { }

  public getAllGenres():Observable<Genre[]>{
    return this.client.get<Genre[]>(config.base_url+config.port+config.genre+config.all)
  }
}
