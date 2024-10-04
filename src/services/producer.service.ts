import { Injectable } from '@angular/core';
import config from "../../public/api.json"
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producer} from "../model/Producer";
@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private client:HttpClient) { }

  public getAll():Observable<Producer[]>{
    return this.client.get<Producer[]>(config.base_url+config.port+config.prod+config.all);
  }
}
