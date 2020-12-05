const router = require('express').Router();

//import functions created in controller files
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addThought)


// /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
//get, get one, post, put, delete

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

// post reaction, delete reaction

module.exports = router;