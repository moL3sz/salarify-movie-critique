import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MovieDescriptionCardComponent } from './movie-description-card/movie-description-card.component';
import { AddModifyMovieComponent } from './add-modify-movie/add-modify-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCardComponent,
    PaginatorComponent,
    MovieDescriptionCardComponent,
    AddModifyMovieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
