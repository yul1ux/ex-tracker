const express = require('express')
const {createUser,addExercise,log} = require('../controllers')

const router = express.Router()

router.post('/users',createUser)
router.post('/users/:_id/exercises',addExercise)
router.get('/users/:_id/logs',log)

module.exports = router