const express = require("express");
const router = express.Router();
const fs = require("fs");
let jsonData = require("./movies.json");

//GET Request

router.get("/zcxX", (req, res) => {
  fs.readFile(__dirname + "/" + "movies.json", "utf8", (err, data) => {
    res.end(data);
  });
});

//POST Request

router.post("/add", (req, res) => {
  const id = Number(req.body.id);
  const title = req.body.title;
  const incomingData = { id, title };
  jsonData.push(incomingData);
  res.json(jsonData);
  jsonData = JSON.stringify(jsonData, undefined, 2);
  fs.writeFile("./routes/movies.json", jsonData, (err, result) => {
    if (err) console.log("error", err);
  });
});

// PUT Request

router.put("/:id", (req, res) => {
  const movieid = Number(req.params.id);
  const body = req.body;
  const movie = jsonData.find((movie) => movie.id === movieid);
  const index = jsonData.indexOf(movie);

  if (!movie) {
    res.status(500).send("Movie not found");
  } else {
    let updatedMovie = { ...movie, ...body };
    jsonData[index] = updatedMovie;
    res.send(jsonData);
    jsonData = JSON.stringify(jsonData, undefined, 2);
    fs.writeFile("./routes/movies.json", jsonData, (err, result) => {
      if (err) console.log("error", err);
    });
  }
});

// DELETE Request

router.delete("/:id", (req, res) => {
  const movieid = Number(req.params.id);
  const newMovies = jsonData.filter((movie) => movie.id !== movieid);

  if (!newMovies) {
    res.status(500);
  } else {
    jsonData = newMovies;
    res.send(jsonData);
    jsonData = JSON.stringify(jsonData, undefined, 2);
    fs.writeFile("./routes/movies.json", jsonData, (err, result) => {
      if (err) console.log("error", err);
    });
  }
});

module.exports = router;
