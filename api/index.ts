import express, {Express, Request,Response} from "express";
import {PORT} from "./misc/globals";
import cors from "cors"
import {addMovie, getMovieById, getMovies, getPageSize, updateMovie} from "./modules/db/database";
const app: Express = express();

app.use(express.json()) //middleware for json parse
app.use(express.urlencoded())
app.use(cors())


app.get("/movies/page/:page",(req:Request, res:Response)=>{
    const page_number = parseInt(req.params.page,10)
    getMovies(page_number,res)
})
app.get("/movies/:id",(req:Request, res:Response) => {
    const id = req.params.id
    getMovieById(id, res);
})
app.post("/movies",(req: Request, res:Response)=>{
    const {movie} = req.body
    addMovie(movie,res);
})
app.put("/movies",(req:Request, res:Response)=>{
    const {movie} = req.body
    console.log(movie)
    updateMovie(movie,res)
})
app.get("/movies/pages/size",(req:Request, res:Response) => {
    getPageSize(res);
})

app.listen(PORT,()=>{
    console.log(`Server has started at http://localhost:${PORT}`)
})