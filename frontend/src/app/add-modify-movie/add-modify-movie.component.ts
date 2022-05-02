import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { capitalize, rating_keys } from 'src/misc/globals';
import { movie, rating, simple_movie } from 'src/misc/models';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-add-modify-movie',
  templateUrl: './add-modify-movie.component.html',
  styleUrls: ['./add-modify-movie.component.scss']
})
export class AddModifyMovieComponent implements OnInit {
  movie?: movie
  objectKeys = Object.keys
  objectValues = Object.values
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    ref: any
    movie: movie
  },
    private service: MoviesService) { }

  ngOnInit(): void {
    this.movie = this.data.movie;
  }
  parse(s: string): string {
    return capitalize(s).replace("_", " ");
  }
  toint(s: string): number {
    return parseInt(s);
  }

  onRadioChange(key: string, value: number) {

    if (this.movie) {
      this.movie.ratings[key as keyof rating] = value + 1;
    }


  }

  save(): void {
    //get the input values from the forms
    let new_movie: movie;

    const name = (document.getElementById("m-name") as HTMLInputElement).value;
    const year = (document.getElementById("m-year") as HTMLInputElement).value;
    const directors = (document.getElementById("m-directors") as HTMLInputElement).value;
    const stars = (document.getElementById("m-stars") as HTMLInputElement).value;
    const writers = (document.getElementById("m-writers") as HTMLInputElement).value;
    const img_url = (document.getElementById("m-img_url") as HTMLInputElement).value;
    const review = (document.getElementById("m-review") as HTMLTextAreaElement).value;
    let ratings: rating = {
         directing: -1,
        acting: -1,
        costume_design: -1,
        editing: -1,
        music: -1,
        visual_effects: -1,
        screenplay: -1
    }

    //get radiobuttons values
    for(const key of rating_keys){
        const current_radios = document.querySelectorAll(`.${key}-radio input`) as NodeListOf<HTMLInputElement>
        Array.from(current_radios).forEach((radio)=>{
          if(radio.checked){
            ratings[key as keyof rating] = parseInt(radio.value);
          }
        })
    }
    new_movie = {
      id: this.movie?.id || -1, //-1 means it must be added
      name: name,
      year: year,
      director: directors,
      stars: stars,
      writers: writers,
      img_url: img_url,
      review: review,
      ratings: ratings
    }
    if(this.movie){
      this.service.updateMovie(new_movie)
    }
    else{
      this.service.addMovie(new_movie)
    }

}
close() {
  this.data.ref.closeAll();
}

}
