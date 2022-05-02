import {Component, OnInit} from '@angular/core';
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
  currentPage: number = 1;


  constructor(private service: MoviesService) { }
  ngOnInit(): void {
    // get movies from the API
    this.loadMovies(this.currentPage)

  }
  onPageChange(page: number){
    this.loadMovies(page);
  }

  loadMovies(page: number): void{
    this.service.getMovies(page)
      .then(({movies, success}) => {
        if(!success){
          //something went wrong
          setTimeout(()=>{
            this.ngOnInit()
            this.loading = true
          },2500)
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
