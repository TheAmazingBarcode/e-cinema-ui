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
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GenreService} from "../services/genre.service";
import {DataService} from "../services/data.service";
import {StorageService} from "../services/storage.service";
import {MovieCardComponent} from "./movie-card/movie-card.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {UserComponent} from "../profile/user/user.component";
import {Projection} from "../model/Projection";
import {ProjectionService} from "../services/projection.service";
import {ProjectionCardComponent} from "./projection-card/projection-card.component";

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
    MatProgressSpinner,
    MovieCardComponent,
    MatTab,
    MatTabGroup,
    UserComponent,
    ProjectionCardComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  projections: Projection[] = [];
  isLogged: boolean = false;
  index: Number = 0;


  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private projectionService: ProjectionService
  ) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.chooseQuery(params);
    });
  }

  private chooseQuery(query: ParamMap) {
    switch (query.get('type')) {
      case 'all':
        this.index = 0;
        this.movieService.getAllMovies().subscribe(data => {
          this.movies = data
        });
        this.projectionService.getAll().subscribe((data) => {
          this.projections = data;
        })
        break;
      case 'projection':
        this.index = 1;
        this.movieService.getAllMovies().subscribe(data => {
          this.movies = data
        });
        this.projectionService.getProjectionsOfMovie(parseInt(query.get('select') || '1')).subscribe(data => this.projections = data);
        break;
      case 'genre':
        this.index = 0;
        this.movieService.getMoviesByGenre(parseInt(query.get('select') || '1')).subscribe(data => this.movies = data);
        break;
      default:
        this.index = 0;
        this.movieService.getAllMovies().subscribe(data => this.movies = data);
    }
  }

  public viewMovie(movie: Movie): void {
    this.dataService.setData(movie);
    this.router.navigateByUrl('movies/individual');
  }
}
