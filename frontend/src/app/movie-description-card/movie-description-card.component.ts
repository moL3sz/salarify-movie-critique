import {Component, Input, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MoviesService} from "../movies/movies.service";
import {AddModifyMovieComponent} from "../add-modify-movie/add-modify-movie.component";
import {movie} from "../../misc/models";

@Component({
  selector: 'app-movie-description-card',
  templateUrl: './movie-description-card.component.html',
  styleUrls: ['./movie-description-card.component.scss']
})
export class MovieDescriptionCardComponent implements OnInit {

  movie?: movie;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      id:number
      ref: any
    }, private service: MoviesService,
    public editDialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.service.getMovie(this.data.id)
      .then(res=>{
        if(res.success){
          this.movie = res.movie
        }
      })
  }
  getAVGRate(): string{
    try {
      if(this.movie){
        const avg =
          (this.movie.ratings.directing +
          this.movie.ratings.acting +
          this.movie.ratings.costume_design +
          this.movie.ratings.editing +
          this.movie.ratings.music +
          this.movie.ratings.visual_effects +
          this.movie.ratings.screenplay) / 7
        return avg.toFixed(1)
      }
      return "-1"
    }
    catch (e){
      return "-1"
    }
  }
  close(){
    this.data.ref.closeAll()
  }
  delete(): void{
    this.service.deleteMovie(this.movie?.id || -1)

  }
  edit(): void{
    this.data.ref.closeAll()
    //close
   this.data.ref.open(AddModifyMovieComponent,{
      data:{
        ref: this.editDialog,
        movie:this.movie
      }
    })
    this.data.ref.afterAllClosed.subscribe(()=>{})
  }


}
