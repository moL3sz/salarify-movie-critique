import { Component, OnInit, Input } from '@angular/core';
import { partial_movie} from "../../misc/models";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MovieDescriptionCardComponent} from "../movie-description-card/movie-description-card.component";
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie?: partial_movie;
  constructor(public movieDialog: MatDialog) { }
  ngOnInit(): void {
    return
  }

  openMovieDialog(): void{
    const movieDialogRef = this.movieDialog.open(MovieDescriptionCardComponent,{
      data:{
        id:this.movie?.id,
        ref: this.movieDialog
      }
    })


  }
}
