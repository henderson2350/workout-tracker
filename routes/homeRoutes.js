const router = require("express").Router();

app.get('/exercise', (req, res) => {
    res.sendFile('/Users/clarehenderson/gt/homework/workout-tracker/public/exercise.html')
})

app.get('/stats', (req, res) => {
    res.sendFile('/Users/clarehenderson/gt/homework/workout-tracker/public/stats.html')
})

module.exports = router