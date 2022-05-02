"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RATINGS_DELETE_SQL = exports.MOVIE_DELETE_SQL = exports.RATINGS_UPDATE_SQL = exports.MOVIE_UPDATE_SQL = exports.GET_MOVIE_DETAILED = exports.GET_PAGE_SIZE_SQL = exports.GET_PARTIAL_MOVIES_PAGE_SQL = exports.GET_LAST_MOVIE_ID_SQL = exports.RATING_ADD_SQL = exports.MOVIE_ADD_SQL = void 0;
exports.MOVIE_ADD_SQL = `INSERT INTO movies
                            (name, year, director, stars, writers, img_url, review)
                            VALUES (?, ?, ?, ?, ?, ?, ?)`;
exports.RATING_ADD_SQL = `INSERT INTO ratings
                                (movie_id, directing, acting, costume_design, editing, music, visual_effects, screenplay)
                                VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
exports.GET_LAST_MOVIE_ID_SQL = `SELECT id from movies order by id desc limit 1`;
exports.GET_PARTIAL_MOVIES_PAGE_SQL = `SELECT id,img_url, name,year,r.* from movies m
                                            INNER JOIN ratings r
                                            ON m.id = r.movie_id
                                            LIMIT 6 OFFSET ?`;
exports.GET_PAGE_SIZE_SQL = `SELECT count(*) as size from movies `;
exports.GET_MOVIE_DETAILED = `SELECT *, r.* FROM movies m
                                    INNER JOIN ratings r 
                                    ON m.id = r.movie_id
                                    where id = ?`;
exports.MOVIE_UPDATE_SQL = `UPDATE movies SET name = ?,
                                    year = ?,
                                    director = ?,
                                    writers = ?,
                                    stars = ?,
                                    img_url = ?,
                                    review = ?
                                WHERE id = ?`;
exports.RATINGS_UPDATE_SQL = `UPDATE ratings SET directing = ?,
                                        acting = ?,
                                        costume_design = ?,
                                        editing = ?,
                                        music = ?,
                                        visual_effects = ?,
                                        screenplay = ?
                                    WHERE movie_id = ?`;
exports.MOVIE_DELETE_SQL = `DELETE FROM movies WHERE id = ?`;
exports.RATINGS_DELETE_SQL = `DELETE FROM ratings WHERE movie_id = ?`;
