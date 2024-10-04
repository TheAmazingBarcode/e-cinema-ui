import {Component, Input} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatCardTitle,
    MatLabel,
    MatCard
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() username = '';
  @Input() email = '';
  @Input() firstName = '';
  @Input() lastName = '';
}
