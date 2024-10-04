import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {StorageService} from "../services/storage.service";
import {MatButton} from "@angular/material/button";
import {MatRipple} from "@angular/material/core";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButton, MatRipple],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front-end';
  isLogged: boolean = false;

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLogged = this.storageService.isLogged();
  }

  logOut(): void {
    Swal.fire({
      title: "Logging out",
      text: "Are you sure you want to log out?",
      icon: "warning",
      background: "#010013",
      confirmButtonText: 'Yes',
      confirmButtonColor: '#9e0404',
      showCancelButton: true,
    }).then(resp => {
      if (resp.isConfirmed) {
        this.storageService.clear();
        this.router.navigateByUrl('/').then(() => window.location.reload());
      }
    });

  }

}
