import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {AuthDto} from "../model/AuthDto";
import Swal from 'sweetalert2'
import {User} from "../model/User";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private storageService: StorageService,
              private router: Router) {
  }

  profile = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  public onSumbit() {
    const auth: AuthDto = this.profile.value as AuthDto;
    this.userService.logIn(auth).subscribe(user => {
          this.storageService.write("id", user.id)
          this.storageService.write("username", user.username)
          this.storageService.write("firstName", user.firstName)
          this.storageService.write("lastName", user.lastName)
          this.storageService.write("email", user.email)
          this.router.navigateByUrl('/movies/all/0').then(()=>window.location.reload())
    })
  }

}
