const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')


router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// router
//     .route('/:UserId')
//     .post(createThought)

router
    .route('/:UserId/:ThoughtId')
    .delete(deleteThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)

router
    .route('/:thoughtId')
    .post(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .put(removeReaction)

module.exports = router