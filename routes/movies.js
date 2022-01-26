const express = require("express");
const router = express.Router();

const Movies = require("../models/movies");

router.post("/addNewMovie", async (req, res, next) => {
  const { name, year, director } = req.body;
  console.log("sda", req.body);
  try {
    const newMovie = new Movies({
      name,
      year,
      director,
    });
    let nMovie = await newMovie.save();
    console.log(nMovie);
    res.json(nMovie);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post("/deleteMovie", async (req, res, next) => {
  const { name, year, director } = req.body;
  console.log("To delete", req.body);
  res.json(req.body);
  try {
    let newM = await Movies.deleteOne({
      name: name,
      year: year,
      director: director,
    });
    console.log("Item deleted");
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateMovie", async (req, res, next) => {
  const { name, year, director, id } = req.body;
  try {
    const mov = await Movies.findById(id);
    console.log("aici", mov);
    let matchingData = { id: id };
    let newName = { $set: { name: name, year: year, director: director } };
    let updatedMovie = await Movies.updateOne(matchingData, newName);
    console.log("To update");
    res.json(updatedMovie);
  } catch (err) {
    console.log(err);
  }
});

router.post("/massAdd", async (req, res) => {
  let data = req.body;
  let arr = [];
  try {
    for (item of data) {
      console.log("aici e itemu", item);
      // let chestii = { ...item };
      // console.log(chestii);
      // const { name, year, director } = item;
      const newMovie = new Movies({
        name: item.name,
        year: item.year,
        director: item.director,
      });
      let nMovie = await newMovie.save();
      arr.push(nMovie);
    }

    res.status(200).send(arr);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getAllFilms", async (req, res) => {
  try {
    let movies = await Movies.find();
    console.log(movies);
    res.json(movies);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
module.exports = router;
