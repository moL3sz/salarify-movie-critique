import { Component, OnInit, Input } from '@angular/core';
import {movie, partial_movie} from "../../misc/models";
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie?: partial_movie;
  constructor() { }
  ngOnInit(): void {
  }

  openMovieDialog(): void{

  }
}
