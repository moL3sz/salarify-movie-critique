"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.getMovieById = exports.getPageSize = exports.getMovies = exports.addMovie = void 0;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/database.sqlite");
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
            movie: movie
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
    const SQL = `SELECT img_url, name,year,r.* from movies m
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
            return { name: item.name, year: item.year, img_url: item.img_url, rating: parseFloat(avg_rating.toFixed(1)) };
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
        console.log(result);
        res.send({
            page_size: Math.ceil(result.size / 6) // 6 movie per page
        });
    });
};
exports.getPageSize = getPageSize;
//will send back the full detailed version of the movie
const getMovieById = (id, res) => {
    const SQL = `SELECT * from movies where id = ?`;
    const movie = db.prepare(SQL);
    movie.get(id, (err, row) => {
        if (err) {
            res.send({
                success: false,
                movie: undefined
            });
        }
        else {
            res.send({
                success: true,
                movie: row
            });
        }
    });
};
exports.getMovieById = getMovieById;
const updateMovie = (movie) => {
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
