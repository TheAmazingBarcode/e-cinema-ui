import {Component, Input} from '@angular/core';
import {Review} from "../../model/Review";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {

  @Input() review:Review | null = null;


}
