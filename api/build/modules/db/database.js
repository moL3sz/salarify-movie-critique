"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getPageSize = exports.getMovies = exports.addMovie = void 0;
const sql_1 = require("./sql");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/database.sqlite");
const validateMovie = (movie) => {
    //this must be the first priority name and year
    if (movie.name === "")
        return false;
    if (!parseInt(movie.year)) //check if year is a number
        return false;
    if (movie.director === "") {
        return false;
    }
    if (movie.writers === "") {
        return false;
    }
    if (movie.stars === "") {
        return false;
    }
    if (movie.img_url === "") {
        return false;
    }
    if (movie.review === "") {
        return false;
    }
    return true;
};
const addMovie = (movie, res) => {
    if (!validateMovie(movie)) {
        res.send({
            valid: false,
            success: false
        });
        return;
    }
    try {
        db.serialize(() => {
            const movie_stmt = db.prepare(sql_1.MOVIE_ADD_SQL);
            const rate_stmt = db.prepare(sql_1.RATING_ADD_SQL);
            movie_stmt.run([movie.name, movie.year, movie.director, movie.stars, movie.writers, movie.img_url, movie.review]);
            const rating = movie.ratings;
            db.get(sql_1.GET_LAST_MOVIE_ID_SQL, (err, result) => {
                rate_stmt.run([result.id, rating.directing, rating.acting, rating.costume_design, rating.editing, rating.music, rating.visual_effects, rating.screenplay]);
            });
        });
        res.send({
            valid: true,
            success: true,
        });
    }
    catch (e) {
        res.send({
            valid: true,
            success: false
        });
    }
};
exports.addMovie = addMovie;
const getMovies = (page_number, res) => {
    const offset = (page_number - 1) * 6; //because 3*2 grid has 6 cells
    const movies = db.prepare(sql_1.GET_PARTIAL_MOVIES_PAGE_SQL);
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
    db.get(sql_1.GET_PAGE_SIZE_SQL, (err, result) => {
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
    const movie = db.prepare(sql_1.GET_MOVIE_DETAILED);
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
    if (!validateMovie(movie)) {
        res.send({
            valid: false,
            success: false
        });
        return;
    }
    try {
        const m_update_stmt = db.prepare(sql_1.MOVIE_UPDATE_SQL);
        m_update_stmt.run([
            movie.name,
            movie.year,
            movie.director,
            movie.writers,
            movie.stars,
            movie.img_url,
            movie.review,
            movie.id
        ]);
        m_update_stmt.finalize();
        const r_update_stmt = db.prepare(sql_1.RATINGS_UPDATE_SQL);
        r_update_stmt.run([
            movie.ratings.directing,
            movie.ratings.acting,
            movie.ratings.costume_design,
            movie.ratings.editing,
            movie.ratings.music,
            movie.ratings.visual_effects,
            movie.ratings.screenplay,
            movie.id
        ]);
        r_update_stmt.finalize();
        res.send({
            valid: true,
            success: true,
        });
    }
    catch (error) {
        res.send({
            valid: true,
            success: false,
        });
    }
};
exports.updateMovie = updateMovie;
//delete movie
const deleteMovie = (id, res) => {
    try {
        const m_delete_stmt = db.prepare(sql_1.MOVIE_DELETE_SQL);
        const r_delete_stmt = db.prepare(sql_1.RATINGS_DELETE_SQL);
        m_delete_stmt.run(id);
        r_delete_stmt.run(id);
        // :| async db query makes it hard and complex :(
        res.send({
            success: true
        });
    }
    catch (e) {
        res.send({
            success: false
        });
    }
};
exports.deleteMovie = deleteMovie;
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
