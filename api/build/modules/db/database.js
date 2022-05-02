"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.getMovieById = exports.getPageSize = exports.getMovies = exports.addMovie = void 0;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/database.sqlite");
const validateMovie = (movie) => {
    if (movie.name != "")
        return false;
    if (!parseInt(movie.year)) //check if year is a number
        return false;
    return true;
};
const addMovie = (movie, res) => {
    try {
        db.serialize(() => {
            const SQL_MOVIE = "INSERT INTO movies (name, year, director, stars, writers, img_url, review) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const SQL_RATING = "INSERT INTO ratings (movie_id, directing, acting, costume_design, editing, music, visual_effects, screenplay) VALUES (?,?, ?, ?, ?, ?, ?, ?)";
            const movie_stmt = db.prepare(SQL_MOVIE);
            const rate_stmt = db.prepare(SQL_RATING);
            movie_stmt.run([movie.name, movie.year, movie.director, movie.stars, movie.writers, movie.img_url, movie.review]);
            const rating = movie.ratings;
            db.get("SELECT id from movies order by id desc limit 1", (err, result) => {
                rate_stmt.run([result.id, rating.directing, rating.acting, rating.costume_design, rating.editing, rating.music, rating.visual_effects, rating.screenplay]);
            });
        });
        res.send({
            success: true,
        });
    }
    catch (e) {
        res.send({
            success: false
        });
    }
};
exports.addMovie = addMovie;
const getMovies = (page_number, res) => {
    const offset = (page_number - 1) * 6; //because 3*2 grid has 6 cells
    //partial query
    const SQL = `SELECT id,img_url, name,year,r.* from movies m
                 INNER JOIN ratings r
                 ON m.id = r.movie_id
                 LIMIT 6 OFFSET ?`;
    const movies = db.prepare(SQL);
    movies.all(offset, (err, result) => {
        if (err) {
            res.send({
                success: false,
                movies: []
            });
            return;
        }
        const movies = result.map((item) => {
            const avg_rating = // 2 multiply for ten scale rating
             (2 * (item.directing +
                item.editing +
                item.acting +
                item.costume_design +
                item.music +
                item.visual_effects +
                item.screenplay) / 7);
            return { id: item.id, name: item.name, year: item.year, img_url: item.img_url, rating: parseFloat(avg_rating.toFixed(1)) };
        });
        res.send({
            success: true,
            movies: movies
        });
    });
};
exports.getMovies = getMovies;
//get the page number size
const getPageSize = (res) => {
    db.get("SELECT count(*) as size from movies ", (err, result) => {
        if (err) {
            res.send({
                page_size: 0
            });
            return;
        }
        res.send({
            page_size: Math.ceil(result.size / 6) // 6 movie per page
        });
    });
};
exports.getPageSize = getPageSize;
//will send back the full detailed version of the movie
const getMovieById = (id, res) => {
    const SQL = `SELECT *, r.* FROM movies m
        INNER JOIN ratings r 
         ON m.id = r.movie_id
        where id = ?`;
    const movie = db.prepare(SQL);
    movie.get(id, (err, row) => {
        //map the movie for the correct format
        const movieResponse = {
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
        };
        if (err) {
            res.send({
                success: false,
                movie: undefined
            });
        }
        else {
            res.send({
                success: true,
                movie: movieResponse
            });
        }
    });
};
exports.getMovieById = getMovieById;
//update movie
const updateMovie = (movie, res) => {
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
        m_update_stmt.run([
            movie.name,
            movie.year,
            movie.director,
            movie.writers,
            movie.stars,
            movie.img_url,
            movie.review,
            movie.id
        ], (err, r) => {
            console.log(err);
        });
        m_update_stmt.finalize();
        console.log("ASDAS");
        const r_update_stmt = db.prepare(RATINGS_UPDATE_SQL);
        console.log("ASDAS");
        r_update_stmt.run([
            movie.ratings.directing,
            movie.ratings.acting,
            movie.ratings.costume_design,
            movie.ratings.editing,
            movie.ratings.music,
            movie.ratings.visual_effects,
            movie.ratings.screenplay,
            movie.id
        ], (err, r) => {
            console.log(err);
        });
        console.log("ASDAS");
        r_update_stmt.finalize();
        console.log("ASDAS");
        res.send({
            success: true
        });
    }
    catch (error) {
        res.send({
            success: false
        });
    }
};
exports.updateMovie = updateMovie;
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
