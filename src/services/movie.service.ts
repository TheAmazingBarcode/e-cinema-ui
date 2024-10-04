import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../model/Movie";
import config from "../../public/api.json"

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private client: HttpClient) {
  }

  public getAllMovies(): Observable<Movie[]> {
    return this.client.get<Movie[]>(config.base_url + config.port + config.mov + config.all);
  }

  public getMoviesByGenre(id: Number): Observable<Movie[]> {
    return this.client.get<Movie[]>(config.base_url + config.port + config.mov + config.genre + '/' + id);
  }

  public newMovie(movie:Movie):Observable<Movie>{
    return this.client.post<Movie>(config.base_url+config.port+config.mov+config.new,movie);
  }

}
