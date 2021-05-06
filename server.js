const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path')
const db = require('./models')

// const routes = require('routes')

const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
// const Workout = require("./models/workoutModel.js");
// const Exercise = require("./models/exerciseModel.js");

const app = express();

// const db = mongojs("workout", "workouts")
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(require('./routes/homeRoutes'))
app.use(require('./routes/apiRoutes/workoutRoutes'))


// app.get('/exercise', (req, res) => {
//     res.sendFile('/Users/clarehenderson/gt/homework/workout-tracker/public/exercise.html')
// })

// app.get('/stats', ({body}, res) => {
//     // res.sendFile('/Users/clarehenderson/gt/homework/workout-tracker/public/stats.html')
//     db.Workout.find({})
//         .then(dbWorkout => {
//             console.log(dbWorkout)
//             res.json(dbWorkout)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
