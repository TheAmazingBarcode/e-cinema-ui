import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {MovieService} from "../services/movie.service";
import {Genre} from '../model/Genre';
import {Producer} from "../model/Producer";
import {Actor} from '../model/Actor';
import {GenreService} from "../services/genre.service";
import {ActorService} from "../services/actor.service";
import {ProducerService} from "../services/producer.service";
import {concatMap} from "rxjs";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {Movie} from "../model/Movie";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  providers: [provideNativeDateAdapter()]
  ,
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService,
              private genreService: GenreService,
              private actorService: ActorService,
              private producerService: ProducerService,
              private router: Router) {
  }

  genreArr: Genre[] = []
  producerArr: Producer[] = []
  actorArr: Actor[] = []

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.genreService.getAllGenres().pipe(concatMap(genres => {
      this.genreArr = genres;
      return this.actorService.getAll()
    }), concatMap(actors => {
      this.actorArr = actors;
      return this.producerService.getAll()
    })).subscribe(producers => {
      this.producerArr = producers;
    })
  }

  movie = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    duration: [0, Validators.required],
    genre: [null, Validators.required],
    createdAt: [null, Validators.required],
    producer: [null, Validators.required],
    actors: [[], Validators.required],
  })

  public onSubmit() {
    const mov = this.movie.value as unknown as Movie
    this.movieService.newMovie(mov).subscribe(data =>{
      this.router.navigateByUrl("movies/all/0").then(()=>window.location.reload())
    })
  }
}
