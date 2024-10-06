import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Projection} from "../model/Projection";
import config from "../../public/api.json"

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  constructor(private client:HttpClient) { }

  public getAll():Observable<Projection[]>{
    return this.client.get<Projection[]>(config.base_url+config.port+config.proj+config.all);
  }

  public getProjectionsOfMovie(id:Number):Observable<Projection[]>{
    return this.client.get<Projection[]>(config.base_url+config.port+config.proj+config.mov+'/'+id);
  }

  public getAvailableProjections(id:Number):Observable<Projection[]>{
    return this.client.get<Projection[]>(config.base_url+config.port+config.proj+config.user+'/'+id);
  }
}
