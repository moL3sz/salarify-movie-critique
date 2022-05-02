import {Response} from "express";
import {movie, partial_movie} from "../../misc/models";
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database(__dirname + "/database.sqlite")



const validateMovie = (movie: movie): boolean=>{
    if(movie.name != "")
        return false
    if(!parseInt(movie.year)) //check if year is a number
        return false
    return true

}

export const addMovie = (movie: movie, res: Response) =>{
    try{
        db.serialize(()=> {
            const SQL_MOVIE = "INSERT INTO movies (name, year, director, stars, writers, img_url, review) VALUES (?, ?, ?, ?, ?, ?, ?)"
            const SQL_RATING = "INSERT INTO ratings (movie_id, directing, acting, costume_design, editing, music, visual_effects, screenplay) VALUES (?,?, ?, ?, ?, ?, ?, ?)"
            const movie_stmt = db.prepare(SQL_MOVIE)
            const rate_stmt = db.prepare(SQL_RATING)
            movie_stmt.run([movie.name, movie.year, movie.director, movie.stars, movie.writers, movie.img_url, movie.review])
            const rating = movie.ratings
            db.get("SELECT id from movies order by id desc limit 1", (err: Error, result: {id:number})=>{
                rate_stmt.run([result.id, rating.directing, rating.acting, rating.costume_design, rating.editing, rating.music, rating.visual_effects, rating.screenplay])
            })
        })
        res.send({
            success:true,
        })
    }
    catch (e){
        res.send({
            success:false
        })
    }
}

export const getMovies = (page_number: number, res: Response) =>{
    const offset = (page_number-1) * 6; //because 3*2 grid has 6 cells

    //partial query
    const SQL =  `SELECT id,img_url, name,year,r.* from movies m
                 INNER JOIN ratings r
                 ON m.id = r.movie_id
                 LIMIT 6 OFFSET ?`;

    interface sql_movie{
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
    const movies = db.prepare(SQL);
    movies.all(offset, (err:Error, result:sql_movie[])=>{
        if (err){
            res.send({
                success:false,
                movies:[]
            })
            return
        }

        const movies: partial_movie[] = result.map((item: sql_movie)=>{
            const avg_rating = // 2 multiply for ten scale rating
                (2 * (item.directing +
                item.editing +
                item.acting +
                item.costume_design +
                item.music +
                item.visual_effects +
                item.screenplay) / 7);

            return {id:item.id, name: item.name,year: item.year, img_url: item.img_url, rating: parseFloat(avg_rating.toFixed(1))}
        })
        res.send({
            success:true,
            movies:movies
        })
    })
}

//get the page number size
export const getPageSize = (res: Response)=>{
    db.get("SELECT count(*) as size from movies ", (err:Error, result: { size: number })=>{
        if(err){
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
export const getMovieById = (id: string, res: Response)=>{
    const SQL =
        `SELECT *, r.* FROM movies m
        INNER JOIN ratings r 
         ON m.id = r.movie_id
        where id = ?`
    const movie = db.prepare(SQL)
    interface sql_movie{
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
    movie.get(id, (err: Error,row: sql_movie)=>{
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


        if (err){
            res.send({
                success:false,
                movie: undefined
            })
        }
        else{
            res.send({
                success:true,
                movie:movieResponse
            })
        }
    })
}

//update movie
export const updateMovie = (movie: movie,res: Response) =>{
    const MOVIE_UPDATE_SQL = `
    UPDATE movies SET name = ?,
                   year = ?,
                   director = ?,
                   writers = ?,
                   stars = ?,
                   img_url = ?,
                   review = ?
    WHERE id = ?
    `;

    const RATINGS_UPDATE_SQL = `
    UPDATE ratings SET directing = ?,
                    acting = ?,
                    costume_design = ?,
                    editing = ?,
                    music = ?,
                    visual_effects = ?,
                    screenplay = ?
    WHERE movie_id = ?
    `;

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
            ],(err:Error,r:any)=>{
                console.log(err)
            })
        
        m_update_stmt.finalize()
        console.log("ASDAS")
    
        const r_update_stmt = db.prepare(RATINGS_UPDATE_SQL);
        console.log("ASDAS")

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
            ],(err:Error,r:any)=>{
                console.log(err)
            }
        )
        console.log("ASDAS")

        r_update_stmt.finalize()
        console.log("ASDAS")

        res.send({
            success:true
        })
    } catch (error) {
        res.send({
            success:false
        })
    }
   
    
}

//delete movie
export const deleteMovie = (id: string, res: Response) =>{
    try{        
        const MOVIE_DELETE_SQL =  `
            DELETE FROM movies WHERE id = ?
        `;


        const RATINGS_DELETE_SQL =  `
            DELETE FROM ratings WHERE movie_id = ?
        `

        const m_delete_stmt = db.prepare(MOVIE_DELETE_SQL);
        const r_delete_stmt = db.prepare(RATINGS_DELETE_SQL);

        m_delete_stmt.run(id);
        r_delete_stmt.run(id);


        
        // :| async db query makes it hard and complex :(
        res.send({
            success:true
        })
    
    }
    catch(e){
        res.send({
            success:false
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