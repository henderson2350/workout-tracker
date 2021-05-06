const router = require('express').Router()
const { Workout } = require('../../models/index.js')
const mongojs = require('mongojs')

//creating a workout and sending it to the collection
router.post('/api/workouts', (req, res) => {
    Workout.create({})
        .then((dbworkout) => {
            res.json(dbworkout)
        })
        .catch((error) => {
            res.json(error)
        })
})

router.get('/api/workouts', (req, res) => {
    Workout.find({})
      .then(dbworkout => {
          res.json(dbworkout)
      })
      .catch((error) => {
          res.json(error)
      })
})

router.get('/api/workouts/range', (req, res) => {
    Workout.find().sort({day: -1}).limit(7)
        .then(dbworkout => {
            res.json(dbworkout)
        })
        .catch((error) => {
            res.json(error)
        })
})

// router.post('/api/workouts/:id', ({body}, res) => {
//     Workout.update(
//         {
//             _id: req.params.id
//         },
//         {
//             $set({
//                 exercises: body
//             })
//         },
//         (error, data) => {
//             if (error) {
//                 res.send(error)
//             } else {
//                 res.send(data)
//             }
//         }
//     )
// })

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
