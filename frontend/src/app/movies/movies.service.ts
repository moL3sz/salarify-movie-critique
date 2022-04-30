import { Injectable } from '@angular/core';
import {movie, partial_movie} from "../../misc/models";
import {API} from "../../misc/globals";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }
  async getMovies(page: number): Promise<{ success:boolean, movies: partial_movie[] }>{
    const endpoint = `${API}/movies/page/${page}`

    try {
      const data = await fetch(endpoint);
      const parsed = await data.json()
      console.log(parsed)
      return {success:parsed.success, movies:parsed.movies}
    }
    catch (e) {
      //check if the fetch hasn't got repsonse
      return {success: false, movies:[]}
    }
  }
  async updateMovie(movie: movie){

  }
  async deleteMovie(id:number){

  }
  async addMove(movie: movie){

  }
  async getPages(): Promise<{sucess: boolean, size: number}>{
    try {
      const endpoint = `${API}/movies/pages/size`;
      const data = await fetch(endpoint);
      const parsed: {page_size: number} = await data.json()
      return {
        sucess: true,
        size: parsed.page_size
      }
    }
    catch (e){
      return {
        sucess: false,
        size: -1
      }
    }
  }
}
