import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyMovieComponent } from './add-modify-movie.component';

describe('AddModifyMovieComponent', () => {
  let component: AddModifyMovieComponent;
  let fixture: ComponentFixture<AddModifyMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModifyMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
