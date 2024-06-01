const express = require('express')

const router = express.Router()

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../Controllers/courceController')

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;