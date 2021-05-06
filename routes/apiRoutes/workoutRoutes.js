const router = require('express').Router()
const { Workout } = require('../../models/index.js')
const mongojs = require('mongojs')


//creating a workout and sending it to the collection
// router.get('/', (req, res) => {
//     Workout.find({})
//       .then(dbworkout => {
//           res.json(dbworkout)
//       })
//       .catch((error) => {
//           res.json(error)
//       })
// })

router.post('/api/workouts/', (req, res) => {
    Workout.create(req.body)
        .then((dbworkout) => {
            res.json(dbworkout)
        })
        .catch((error) => {
            res.json(error)
        })
})

router.put('/api/workouts/:id', (req, res) => {
    console.log(req.body)
    Workout.findByIdAndUpdate(req.params.id, 
        {$push: {exercises: req.body}}, 
        {new: true})

        .then((dbworkout) => {
            res.json(dbworkout)
        })
        .catch((error) => {
            console.log(error)
            res.json(error)
        })
})

// router.get('/api/workouts', (req, res) => {
//     Workout.find({})
//       .then(dbworkout => {
//           res.json(dbworkout)
//       })
//       .catch((error) => {
//           res.json(error)
//       })
// })

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration"}
            }
        }
    ])
      .then(dbworkout => {
          res.json(dbworkout)
      })
      .catch((error) => {
          res.json(error)
      })
})

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration"},
            }
        }
    ]

    ).sort({day: -1}).limit(7)
        .then(dbworkout => {
            reversed = dbworkout.reverse()
            res.json(reversed)
        })
        .catch((error) => {
            res.json(error)
        })
})


router.delete('/api/workouts/:id', (req, res) => {
    // console.log(mongojs.ObjectId(req.params.id))
    Workout.remove(
        {
            _id: req.params.id
        }, 
        (error, data) => {
            if (error) {
                res.send(error)
            } else {
                res.send(data)
            }
        })
})

module.exports = router
