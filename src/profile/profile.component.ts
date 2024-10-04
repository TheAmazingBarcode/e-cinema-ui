import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {StorageService} from "../services/storage.service";
import {User} from "../model/User";
import {MatLabel} from "@angular/material/form-field";
import {last} from "rxjs";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {UserComponent} from "./user/user.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatList,
    MatListItem,
    MatListSubheaderCssMatStyler,
    MatLabel,
    MatTabGroup,
    MatTab,
    UserComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private storageService:StorageService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  private loadData(){
    this.username = this.storageService.get('username') || '';
    this.email = this.storageService.get('email') || '';
    this.firstName = this.storageService.get('firstName') || '';
    this.lastName = this.storageService.get('lastName') || '';
  }

  protected readonly last = last;
}
