import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieIndividualComponent } from './movie-individual.component';

describe('MovieIndividualComponent', () => {
  let component: MovieIndividualComponent;
  let fixture: ComponentFixture<MovieIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
