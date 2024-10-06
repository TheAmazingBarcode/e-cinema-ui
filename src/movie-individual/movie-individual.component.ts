import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Movie} from "../model/Movie";
import {DataService} from "../services/data.service";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ReviewComponent} from "./review/review.component";
import Swal from "sweetalert2";
import {ReviewService} from "../services/review.service";
import {ReviewDto} from "../model/ReviewDto";
import {StorageService} from "../services/storage.service";

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
    MatListSubheaderCssMatStyler,
    MatIcon,
    MatTabGroup,
    MatTab,
    ReviewComponent
  ],
  templateUrl: './movie-individual.component.html',
  styleUrl: './movie-individual.component.css'
})
export class MovieIndividualComponent implements OnInit {

  movie: Movie | undefined;

  constructor(private dataService: DataService,
              private router: Router,
              private reviewService: ReviewService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.movie = this.dataService.getData();
  }

  public navigate(): void {
    this.router.navigateByUrl('/movies/projection/' + this.movie?.id)
  }

  public async addReview() {
    const {value: formValues} = await Swal.fire({
      title: "Review",
      color: "#fff",
      showCancelButton: true,
      background: "#010013",
      confirmButtonColor: "#14256e",
      html: `
    <div class="row">
    <div class="mx-auto col-8 d-flex justify-content-center">
      <div class="mx-2">
          <input type="radio" id="isPositive" name="flexRadioDefault" value="isPositive" class="form-check-input">
          <label for="isPositive">Positive</label>
      </div>
      <div class="mx-2">
          <input type="radio" id="isNegative" name="flexRadioDefault" value="isNegative" class="form-check-input">
          <label for="isNegative">Negative</label>
      </div>
      </div>
    </div>
    <textarea id="explanation" class="swal2-textarea">

  `,
      focusConfirm: false,
      preConfirm: () => {

        const isPositive = document.getElementById("isPositive") as HTMLInputElement
        const isNegative = document.getElementById("isNegative") as HTMLInputElement
        const explanation = document.getElementById("explanation") as HTMLTextAreaElement
        explanation.value = explanation.value.trim();

        return [
          isPositive ? isPositive.checked : false,
          isNegative ? isNegative.checked : false,
          explanation ? explanation.value : ''
        ]
      }
    });
    if (formValues) {

      console.log(formValues.length)

      const review: ReviewDto = {
        isPositive: formValues[0],
        movieMovie: {id: this.movie?.id},
        userUser: {id: this.storageService.get('id')},
        explanation: formValues[2]
      }

      this.reviewService.newReview(review).subscribe(data => {
        this.router.navigateByUrl('/movies/all/0')
          .then(() => window.location.reload())
      });

    }
  }

}
