import {Component, OnInit} from '@angular/core';
import {Movie} from "../model/Movie";
import {MovieService} from "../services/movie.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {GenreService} from "../services/genre.service";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatProgressSpinner
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.chooseQuery(params);
    });
  }

  private chooseQuery(query: ParamMap) {
    switch (query.get('type')) {
      case 'all':
        this.movieService.getAllMovies().subscribe(data=>this.movies = data);
        break;
      case 'genre':
        this.movieService.getMoviesByGenre(parseInt(query.get('select') || '1')).subscribe(data=>this.movies = data);
        break;
      default:
        this.movieService.getAllMovies().subscribe(data => this.movies = data);
    }
  }
}
