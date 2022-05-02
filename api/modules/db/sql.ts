


export const MOVIE_ADD_SQL = `INSERT INTO movies
                            (name, year, director, stars, writers, img_url, review)
                            VALUES (?, ?, ?, ?, ?, ?, ?)`;

export const RATING_ADD_SQL = `INSERT INTO ratings
                                (movie_id, directing, acting, costume_design, editing, music, visual_effects, screenplay)
                                VALUES (?,?, ?, ?, ?, ?, ?, ?)`;

export const GET_LAST_MOVIE_ID_SQL = `SELECT id from movies order by id desc limit 1`

export const GET_PARTIAL_MOVIES_PAGE_SQL = `SELECT id,img_url, name,year,r.* from movies m
                                            INNER JOIN ratings r
                                            ON m.id = r.movie_id
                                            LIMIT 6 OFFSET ?`;


export const GET_PAGE_SIZE_SQL = `SELECT count(*) as size from movies `;


export const GET_MOVIE_DETAILED = `SELECT *, r.* FROM movies m
                                    INNER JOIN ratings r 
                                    ON m.id = r.movie_id
                                    where id = ?`;

export const MOVIE_UPDATE_SQL = `UPDATE movies SET name = ?,
                                    year = ?,
                                    director = ?,
                                    writers = ?,
                                    stars = ?,
                                    img_url = ?,
                                    review = ?
                                WHERE id = ?`;

export const RATINGS_UPDATE_SQL = `UPDATE ratings SET directing = ?,
                                        acting = ?,
                                        costume_design = ?,
                                        editing = ?,
                                        music = ?,
                                        visual_effects = ?,
                                        screenplay = ?
                                    WHERE movie_id = ?`;

export const MOVIE_DELETE_SQL =  `DELETE FROM movies WHERE id = ?`;


export const RATINGS_DELETE_SQL =  `DELETE FROM ratings WHERE movie_id = ?`