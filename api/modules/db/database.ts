import * as fs from "fs";
import {Response} from "express";
import {movie} from "../../misc/models";
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database(__dirname + "/database.sqlite")


export const addMovie = (movie: movie, res: Response) =>{
    try{
        db.serialize(()=> {
            const SQL_MOVIE = "INSERT INTO movies (name, year, director, stars, writers, img_url, review) VALUES (?, ?, ?, ?, ?, ?, ?)"
            const SQL_RATING = "INSERT INTO ratings (movie_id, directing, acting, costume_design, editing, music, visual_effects, screenplay) VALUES (?,?, ?, ?, ?, ?, ?, ?)"
            const movie_stmt = db.prepare(SQL_MOVIE)
            const rate_stmt = db.prepare(SQL_RATING)

            movie_stmt.run([movie.name, movie.year, movie.director, movie.stars, movie.writers, movie.imgUrl, movie.review])
            const rating = movie.ratings

            db.get("SELECT id from movies order by id desc limit 1", (err: Error, result: {id:number})=>{
                rate_stmt.run([result.id, rating.directing, rating.acting, rating.costumeDesign, rating.editing, rating.music, rating.visualEffects, rating.screenplay])
            })
        })
        res.send({
            success:true,
            movie:movie
        })
    }
    catch (e){
        res.send({
            success:false
        })
    }
}
export const getMovies = (page_number: number, res: Response) =>{
    const offset = (page_number-1) * 6; //beacuse 3*2 grid has 6 cells
    const SQL =  "SELECT * from movies LIMIT 6 OFFSET ?"
    const movies = db.prepare(SQL);
    movies.all(offset, (err:Error, result:movie[])=>{
        if (err){
            res.send({
                success:false,
                movies:[]
            })
        }
        res.send({
            success:true,
            movies:result
        })

    })
}
export const updateMovie = (movie: movie) =>{
}


/*export const uploadData = ()=>{
    const path = __dirname + "\\data.json"
    const data = fs.readFileSync(path, 'utf-8')
    const movies: movie[] = JSON.parse(data)


    //this is for the first run to add all the existing data to the db
    db.serialize(()=>{
        for(const movie of movies){
            addMovie(movie)
        }
    })

    db.close()
}*/
//uploadData()