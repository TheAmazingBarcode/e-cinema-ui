import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Review} from "../model/Review";
import config from "../../public/api.json"
import {ReviewDto} from "../model/ReviewDto";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private client: HttpClient) {
  }

  public getReviewsOfMovie(id: Number): Observable<Review[]> {
    return this.client.get<Review[]>(config.base_url + config.port + config.rev + config.mov + '/' + id)
  }

  public newReview(dto: ReviewDto): Observable<any> {
    return this.client.post(config.base_url + config.port + config.rev + config.new, dto, {responseType: 'text'})
      .pipe(catchError(error => {
        this.possibleDuplicate();
        return throwError(() => new Error(error.toString()))
      }));
  }

  private possibleDuplicate() {
    Swal.fire({
      title: "Error",
      text: 'Error writing review, have you watched it?',
      icon: "error",
      background: "#010013",
      confirmButtonText: 'Ok',
      confirmButtonColor: '#9e0404',
    })
  }
}
