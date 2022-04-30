import express, {Express, Request,Response} from "express";
import {PORT} from "./misc/globals";
import cors from "cors"
import {getMovieById, getMovies, getPageSize} from "./modules/db/database";
const app: Express = express();


app.use(cors())
app.get("/movies/page/:page",(req:Request, res:Response)=>{
    const page_number = parseInt(req.params.page,10)
    getMovies(page_number,res)
})
app.get("/movies/:id",(req:Request, res:Response) => {
    const id = req.params.id
    getMovieById(id, res);
})
app.get("/movies/page/size",(req:Request, res:Response) => {
    getPageSize(res);
})

app.listen(PORT,()=>{
    console.log(`Server has started at http://localhost:${PORT}`)
})