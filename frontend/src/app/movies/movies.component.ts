import { Component, OnInit } from '@angular/core';
import {MoviesService} from "./movies.service";
import {movie, partial_movie} from "../../misc/models";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  loading: boolean = true;
  // currentPage: number;
  currentMovies: partial_movie[] = []
  constructor(private service: MoviesService) { }
  ngOnInit(): void {
    // get movies from the API
    this.service.getMovies(1)
      .then(({movies, success}) => {
        if(!success){
          //something went wrong
          console.error("Something went wrong!")
          this.loading = false
          return
        }
        this.currentMovies = movies
      })
      .finally(()=>{
        this.loading = false;
      })
  }
}
