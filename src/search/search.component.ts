import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
  }

  searchQuery = this.formBuilder.group({
    name: [''],
    genre: [''],
    actor: [''],
    producer: [''],
  })

  public find(): void {
    let queryParams = ''

    for (const control in this.searchQuery.controls) {
      const formControl = this.searchQuery.get(control);

      if(formControl?.value){
        queryParams = queryParams+control+'='+formControl?.value+'&'
      }
    }

    this.router.navigateByUrl('/movies/search/'+queryParams)
  }

}
