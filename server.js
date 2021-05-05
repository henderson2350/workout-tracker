const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path')
const db = require('./models')

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workoutModel.js");
const Exercise = require("./models/exerciseModel.js");

const app = express();

// const db = mongojs("workout", "workouts")
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//HOME ROUTES
app.get('/exercise', (req, res) => {
    res.sendFile('/Users/clarehenderson/gt/homework/workout-tracker/public/exercise.html')
})

// app.get('/stats', (req, res) => {
//     res.sendFile('/Users/clarehenderson/gt/homework/workout-tracker/public/stats.html')
// })

// USER ROUTES
app.get('/stats', ({body}, res) => {
    res.sendFile('/Users/clarehenderson/gt/homework/workout-tracker/public/stats.html')
    db.Workout.find({})
        .then(dbWorkout => {
            console.log(dbWorkout)
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
