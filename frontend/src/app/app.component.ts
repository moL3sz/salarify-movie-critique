import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModifyMovieComponent } from './add-modify-movie/add-modify-movie.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(public addDialog: MatDialog){}

  addMovie(): void{
    const add_movie_ref = this.addDialog.open(AddModifyMovieComponent,{
      data:{
        ref:this.addDialog
      }
    })
  }
}
