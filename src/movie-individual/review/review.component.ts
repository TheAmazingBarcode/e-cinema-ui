import {Component, Input, OnInit} from '@angular/core';
import {CatalogComponent} from "../../movies/catalog/catalog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MovieCardComponent} from "../../movies/movie-card/movie-card.component";
import {ProjectionCardComponent} from "../../movies/projection-card/projection-card.component";
import {ReviewService} from "../../services/review.service";
import {Review} from "../../model/Review";
import {ReviewCardComponent} from "../review-card/review-card.component";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CatalogComponent,
    MatProgressSpinner,
    MatTab,
    MatTabGroup,
    MovieCardComponent,
    ProjectionCardComponent,
    ReviewCardComponent
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {

  @Input() movId?: Number | null = null;

  reviews: Review[] = []

  constructor(private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.readData();
  }

  private readData(): void {
    this.reviewService.getReviewsOfMovie(this.movId as Number)
      .subscribe(data => this.reviews = data)
  }

}
