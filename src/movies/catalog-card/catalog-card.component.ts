import {Component, Input, OnInit} from '@angular/core';
import {ProjectionDto} from "../../model/ProjectionDto";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UpdateDto} from "../../model/UpdateDto";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-catalog-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardFooter,
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './catalog-card.component.html',
  styleUrl: './catalog-card.component.css'
})
export class CatalogCardComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private storageService: StorageService) {
  }

  @Input() projection!: ProjectionDto;
  timeStr: String = ''

  ngOnInit(): void {
    this.transform()
  }

  public update(status: String) {

    let title = '';
    let text = ''

    if (status === 'WATCH') {
      title = 'Mark as Viewed'
      text = 'Do you want to mark this reservation as viewed?'
    } else {
      title = 'Mark as Canceled'
      text = 'Do you want to mark this projection as canceled?'
    }

    let id: Number = parseInt(this.storageService.get('id') as string)

    Swal.fire({
      title: title,
      text: text,
      icon: "question",
      background: "#010013",
      confirmButtonText: 'Yes',
      confirmButtonColor: '#0d068e',
      showCancelButton: true,
    }).then(resp => {
      if (resp.isConfirmed) {

        const obj: UpdateDto = {
          userId: id,
          projectionId: this.projection.projectionId,
          status: status
        }

        this.userService.updateCatalog(obj)
          .subscribe((rsp) => this.router.navigateByUrl('/movies/all/0')
            .then(() => window.location.reload()))

      }
    });
  }

  private transform(): void {
    let pipe = new DatePipe('en-GB');
    const hm = pipe.transform(this.projection?.startingAt, 'mediumTime', 'UTC');
    const dmy = pipe.transform(this.projection?.startingAt, 'dd/MM/yyyy', 'UTC')
    this.timeStr = dmy + ' ' + hm;
  }

}
