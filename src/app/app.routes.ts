import { Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {GenresComponent} from "../genres/genres.component";
import {MoviesComponent} from "../movies/movies.component";
import {MovieIndividualComponent} from "../movie-individual/movie-individual.component";
import {SignupComponent} from "../signup/signup.component";
import {LoginComponent} from "../login/login.component";
import {ProfileComponent} from "../profile/profile.component";
import {AddComponent} from "../add/add.component";
import {SearchComponent} from "../search/search.component";

export const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'genres',component:GenresComponent},
  {path: 'movies/:type/:select',component:MoviesComponent},
  {path:'movies/individual',component:MovieIndividualComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'add',component:AddComponent},
  {path:'search',component:SearchComponent}
];
