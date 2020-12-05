const router = require('express').Router();

//import functions created in controller files
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user-controller');

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

//get all, get one, post, put, delete

// /api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId')
    .post()
    .delete()

// post friend, delete friend


module.exports = router;