import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {Movie} from "../../model/Movie";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-card',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardSubtitle,
        MatCardTitle
    ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie:Movie | null = null;

  constructor(private dataService:DataService,
              private router:Router) {
  }

  public viewMovie(movie:Movie | null):void{
    this.dataService.setData(movie);
    this.router.navigateByUrl('movies/individual');
  }
}
