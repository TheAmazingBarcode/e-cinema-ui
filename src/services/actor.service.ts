import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Actor} from "../model/Actor";
import config from "../../public/api.json"

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private client: HttpClient) {

  }

  public getAll(): Observable<Actor[]> {
    return this.client.get<Actor[]>(config.base_url + config.port + config.act + config.all);
  }
}
