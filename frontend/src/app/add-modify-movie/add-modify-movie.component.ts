import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { movie } from 'src/misc/models';

@Component({
  selector: 'app-add-modify-movie',
  templateUrl: './add-modify-movie.component.html',
  styleUrls: ['./add-modify-movie.component.scss']
})
export class AddModifyMovieComponent implements OnInit {
  movie!: movie
  constructor (@Inject(MAT_DIALOG_DATA) public data: {
    ref: any
    movie: movie
  }) { }

  ngOnInit(): void {
    this.movie = this.data.movie;
  }

}
