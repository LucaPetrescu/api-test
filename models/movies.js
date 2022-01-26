const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
});

const Movies = mongoose.model("Movies", MoviesSchema);

module.exports = Movies;
