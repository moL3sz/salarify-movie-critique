import { Component, OnInit } from '@angular/core';
import {MoviesService} from "./movies.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  loading: boolean = true;
  // currentPage: number;
  constructor(private service: MoviesService) { }

  ngOnInit(): void {
    // get movies from the API
    this.service.getMovies()
      .then()
      .then()
      .finally(()=>{
        this.loading = false;
      })
  }
}
