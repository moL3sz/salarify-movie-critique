import {Injectable} from '@angular/core';
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
      return {success:parsed.success, movies:parsed.movies}
    }
    catch (e) {
      //check if the fetch hasn't got repsonse
      return {success: false, movies:[]}
    }
  }
  async updateMovie(movie: movie): Promise<{success:boolean, valid:boolean}>{
    const endpoint = `${API}/movies`
    const data = await fetch(endpoint,{
      method:"PUT",
      mode:'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        movie:movie
      })
    })
    const parsed = await data.json()
    return {
      success:parsed.success,
      valid:parsed.valid
    }
  }
  async deleteMovie(id:number): Promise<{success:true}>{
    const endpoint = `${API}/movies/${id}`
    const data = await fetch(endpoint, {
      method:"DELETE"
    })
    const parsed = await data.json()
    return {
      success: parsed.success
    }
  }
  async addMovie(movie: movie): Promise<{success:boolean, valid:boolean}>{
    const endpoint = `${API}/movies`
    console.log(movie)
    const data = await fetch(endpoint,{
      method:"POST",
      mode:'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        movie:movie
      })
    })
    const parsed = await data.json()
    return {
      success:parsed.success,
      valid:parsed.valid
    }
  }
  async getPages(): Promise<{success: boolean, size: number}>{
    try {
      const endpoint = `${API}/movies/pages/size`;
      const data = await fetch(endpoint);
      const parsed: {page_size: number} = await data.json()
      return {
        success: true,
        size: parsed.page_size
      }
    }
    catch (e){
      return {
        success: false,
        size: -1
      }
    }
  }

  async  getMovie(id: number): Promise<{success: boolean, movie:movie | undefined}> {
    try {
      const endpoint = `${API}/movies/${id}`
      const data = await fetch(endpoint)
      return await data.json()
    } catch (e) {
      return {
        success: false,
        movie: undefined

      }
    }
  }
}
