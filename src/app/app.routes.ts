import { Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {GenresComponent} from "../genres/genres.component";
import {MoviesComponent} from "../movies/movies.component";
import {MovieIndividualComponent} from "../movie-individual/movie-individual.component";

export const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'genres',component:GenresComponent},
  {path: 'movies/:type/:select',component:MoviesComponent},
  {path:'movies/individual',component:MovieIndividualComponent}
];
