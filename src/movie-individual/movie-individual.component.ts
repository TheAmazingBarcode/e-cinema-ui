import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Movie} from "../model/Movie";
import {DataService} from "../services/data.service";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";

@Component({
  selector: 'app-movie-individual',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatProgressSpinner,
    MatList,
    MatListItem,
    MatListSubheaderCssMatStyler
  ],
  templateUrl: './movie-individual.component.html',
  styleUrl: './movie-individual.component.css'
})
export class MovieIndividualComponent implements OnInit {

  movie: Movie | undefined;

  constructor(private dataService:DataService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
      this.movie = this.dataService.getData();
  }

}
