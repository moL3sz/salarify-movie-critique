import express, {Express, Request,Response} from "express";
import {PORT} from "./misc/globals";
import cors from "cors"
import { getMovies} from "./modules/db/database";
const app: Express = express();


app.use(cors())
app.get("/movies/page/:page",(req,res)=>{
    const page_number = parseInt(req.params.page,10)
    getMovies(page_number,res)
})

app.listen(PORT,()=>{
    console.log(`Server has started at http://localhost:${PORT}`)
})