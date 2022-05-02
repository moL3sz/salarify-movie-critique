"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globals_1 = require("./misc/globals");
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./modules/db/database");
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware for json parse
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)());
app.get("/movies/page/:page", (req, res) => {
    const page_number = parseInt(req.params.page, 10);
    (0, database_1.getMovies)(page_number, res);
});
app.get("/movies/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.getMovieById)(id, res);
});
app.delete("/movies/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.deleteMovie)(id, res);
});
app.post("/movies", (req, res) => {
    const { movie } = req.body;
    (0, database_1.addMovie)(movie, res);
});
app.put("/movies", (req, res) => {
    const { movie } = req.body;
    console.log(movie);
    (0, database_1.updateMovie)(movie, res);
});
app.get("/movies/pages/size", (req, res) => {
    (0, database_1.getPageSize)(res);
});
app.listen(globals_1.PORT, () => {
    console.log(`Server has started at http://localhost:${globals_1.PORT}`);
});
