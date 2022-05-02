import { Response } from "express";
import { movie, partial_movie } from "../../misc/models";
import {
    MOVIE_DELETE_SQL, RATINGS_DELETE_SQL,
    MOVIE_UPDATE_SQL, RATINGS_UPDATE_SQL,
    MOVIE_ADD_SQL, RATING_ADD_SQL, GET_LAST_MOVIE_ID_SQL, GET_PARTIAL_MOVIES_PAGE_SQL, GET_PAGE_SIZE_SQL, GET_MOVIE_DETAILED
} from "./sql"
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database(__dirname + "/database.sqlite")



const validateMovie = (movie: movie): boolean => {
    //this must be the first priority name and year
    if (movie.name === "")
        return false
    if (!parseInt(movie.year)) //check if year is a number
        return false
    if (movie.director === "") {
        return false
    }
    if (movie.writers === "") {
        return false
    }
    if (movie.stars === "") {
        return false
    }
    if (movie.img_url === "") {
        return false
    }
    if (movie.review === "") {
        return false
    }
    return true

}

export const addMovie = (movie: movie, res: Response) => {
    if (!validateMovie(movie)) {
        res.send({
            valid: false,
            success: false
        })
        return
    }
    try {

        db.serialize(() => {
            const movie_stmt = db.prepare(MOVIE_ADD_SQL)
            const rate_stmt = db.prepare(RATING_ADD_SQL)
            movie_stmt.run([movie.name, movie.year, movie.director, movie.stars, movie.writers, movie.img_url, movie.review])
            const rating = movie.ratings
            db.get(GET_LAST_MOVIE_ID_SQL, (err: Error, result: { id: number }) => {
                rate_stmt.run([result.id, rating.directing, rating.acting, rating.costume_design, rating.editing, rating.music, rating.visual_effects, rating.screenplay])
            })
        })
        res.send({
            valid: true,
            success: true,
        })
    }
    catch (e) {
        res.send({
            valid: true,
            success: false
        })
    }
}

export const getMovies = (page_number: number, res: Response) => {
    const offset = (page_number - 1) * 6; //because 3*2 grid has 6 cells

    //partial query

    interface sql_movie {
        id: number;
        name: string;
        year: string;
        img_url: string
        //rating structure
        directing: number;
        acting: number;
        costume_design: number;
        editing: number;
        music: number;
        visual_effects: number;
        screenplay: number;
    }
    const movies = db.prepare(GET_PARTIAL_MOVIES_PAGE_SQL);
    movies.all(offset, (err: Error, result: sql_movie[]) => {
        if (err) {
            res.send({
                success: false,
                movies: []
            })
            return
        }

        const movies: partial_movie[] = result.map((item: sql_movie) => {
            const avg_rating = // 2 multiply for ten scale rating
                (2 * (item.directing +
                    item.editing +
                    item.acting +
                    item.costume_design +
                    item.music +
                    item.visual_effects +
                    item.screenplay) / 7);

            return { id: item.id, name: item.name, year: item.year, img_url: item.img_url, rating: parseFloat(avg_rating.toFixed(1)) }
        })
        res.send({
            success: true,
            movies: movies
        })
    })
}

//get the page number size
export const getPageSize = (res: Response) => {
    db.get(GET_PAGE_SIZE_SQL, (err: Error, result: { size: number }) => {
        if (err) {
            res.send({
                page_size: 0
            })
            return
        }
        res.send({
            page_size: Math.ceil(result.size / 6) // 6 movie per page
        })
    })
}

//will send back the full detailed version of the movie
export const getMovieById = (id: string, res: Response) => {

    const movie = db.prepare(GET_MOVIE_DETAILED)
    interface sql_movie {
        id: number;
        name: string;
        year: string;
        director: string;
        stars: string;
        writers: string;
        img_url: string
        review: string;
        //rating structure
        directing: number;
        acting: number;
        costume_design: number;
        editing: number;
        music: number;
        visual_effects: number;
        screenplay: number;
    }
    movie.get(id, (err: Error, row: sql_movie) => {
        //map the movie for the correct format


        const movieResponse: movie = {
            id: row.id,
            name: row.name,
            year: row.year,
            director: row.director,
            stars: row.stars,
            writers: row.writers,
            img_url: row.img_url,
            review: row.review,
            ratings: {
                directing: row.directing,
                acting: row.acting,
                costume_design: row.costume_design,
                editing: row.editing,
                music: row.music,
                visual_effects: row.visual_effects,
                screenplay: row.screenplay
            }
        }


        if (err) {
            res.send({
                success: false,
                movie: undefined
            })
        }
        else {
            res.send({
                success: true,
                movie: movieResponse
            })
        }
    })
}

//update movie
export const updateMovie = (movie: movie, res: Response) => {
    if (!validateMovie(movie)) {
        res.send({
            valid: false,
            success: false
        })
        return
    }

    try {
        const m_update_stmt = db.prepare(MOVIE_UPDATE_SQL);
        m_update_stmt.run(
            [
                movie.name,
                movie.year,
                movie.director,
                movie.writers,
                movie.stars,
                movie.img_url,
                movie.review,
                movie.id
            ]
        )

        m_update_stmt.finalize()


        
        const r_update_stmt = db.prepare(RATINGS_UPDATE_SQL);
        r_update_stmt.run(
            [
                movie.ratings.directing,
                movie.ratings.acting,
                movie.ratings.costume_design,
                movie.ratings.editing,
                movie.ratings.music,
                movie.ratings.visual_effects,
                movie.ratings.screenplay,
                movie.id
            ]
        )
        r_update_stmt.finalize()

        res.send({
            valid: true,
            success: true,
        })
    } catch (error) {
        res.send({
            valid: true,
            success: false,
        })
    }


}

//delete movie
export const deleteMovie = (id: string, res: Response) => {
    try {


        const m_delete_stmt = db.prepare(MOVIE_DELETE_SQL);
        const r_delete_stmt = db.prepare(RATINGS_DELETE_SQL);

        m_delete_stmt.run(id);
        r_delete_stmt.run(id);



        // :| async db query makes it hard and complex :(
        res.send({
            success: true
        })

    }
    catch (e) {
        res.send({
            success: false
        })
    }

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