import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectionDto} from "../../model/ProjectionDto";
import {UserService} from "../../services/user.service";
import {CatalogService} from "../../services/catalog.service";
import {StorageService} from "../../services/storage.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CatalogCardComponent} from "../catalog-card/catalog-card.component";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    MatProgressSpinner,
    CatalogCardComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

  catalog: ProjectionDto[] = []
  username: String = ''

  constructor(private router: Router,
              private catalogService:CatalogService,
              private storageSevice:StorageService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.username = this.storageSevice.get('username') as String
    this.catalogService.getUserCatalog(parseInt(this.storageSevice.get('id') as string) as Number).subscribe(data => this.catalog = data);
  }

}
