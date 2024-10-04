import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatHint} from "@angular/material/form-field";
import {User} from "../model/User";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
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
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private storageService: StorageService,
              private router:Router) {
  }

  profile = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required]
  })

  public onSubmit() {
    const user: User = this.profile.value as unknown as User;
    let newUser: User;
    this.userService.signUp(user).subscribe(data => {
      newUser = data;
      this.storageService.write("id", newUser.id)
      this.storageService.write("username", newUser.username)
      this.storageService.write("firstName", newUser.firstName)
      this.storageService.write("lastName", newUser.lastName)
      this.storageService.write("email", newUser.email)
      this.router.navigateByUrl('/movies/all/0').then(()=>window.location.reload())
    })
  }

}
