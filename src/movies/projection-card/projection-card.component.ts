import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {Movie} from "../../model/Movie";
import {Projection} from "../../model/Projection";
import {DatePipe} from "@angular/common";
import {pipe} from "rxjs";
import {StorageService} from "../../services/storage.service";
import Swal from "sweetalert2";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projection-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    DatePipe
  ],
  templateUrl: './projection-card.component.html',
  styleUrl: './projection-card.component.css'
})
export class ProjectionCardComponent implements OnInit {

  @Input() projection: Projection | null = null;

  timeStr: String = ''

  constructor(private storageService: StorageService,
              private userService:UserService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.transform();
  }

  public reserve(): void {
    const map: Map<String, Number> = new Map();
    map.set('userId', parseInt(this.storageService.get('id') as string))
    map.set('projectionId', this.projection?.id as Number)

    Swal.fire({
      title: this.projection?.movie?.name,
      text: 'Do you want to reserve this Movie?',
      icon: 'question',
      background: '#010013',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#14256e',
      showCancelButton: true
    })
      .then(resp => {
        if (resp.isConfirmed) {
          console.log(map)
          this.userService.addToCatalog(map).subscribe(resp => this.router.navigateByUrl('/').then(()=>window.location.reload()))
        }
      })
  }

  private transform(): void {
    let pipe = new DatePipe('en-GB');
    const hm = pipe.transform(this.projection?.startingAt, 'mediumTime', 'UTC');
    const dmy = pipe.transform(this.projection?.startingAt, 'dd/MM/yyyy', 'UTC')
    this.timeStr = dmy + ' ' + hm;
  }
}
