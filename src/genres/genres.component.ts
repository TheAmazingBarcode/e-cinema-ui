import {Component, OnInit} from '@angular/core';
import {GenreService} from "../services/genre.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Genre} from "../model/Genre";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatProgressSpinner,
    RouterLink
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent implements OnInit {
  genres: Genre[] = []

  constructor(private genreService: GenreService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe(data => this.genres = data);
  }

  navigate(genre:Genre): void{
    this.router.navigateByUrl('movies/genre/'+genre.id);
  }

}
