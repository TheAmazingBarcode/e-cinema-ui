import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectionDto} from "../model/ProjectionDto";
import config from "../../public/api.json"


@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private client:HttpClient) { }

  public getUserCatalog(id:Number):Observable<ProjectionDto[]>{
    return this.client.get<ProjectionDto[]>(config.base_url+config.port+config.user+config.cat+'/'+id)
  }
}
