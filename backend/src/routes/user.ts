import express from 'express'
import {
    getAllusers,
    getOneUserMidll,
    retrieveOneUser,
    deleteOneUser,
    patchOneUser,
} from '../controllars/user'
const router = express.Router()

router.get('/get-users', getAllusers)

router.route('/:id')
    .get(getOneUserMidll, retrieveOneUser)
    .delete(getOneUserMidll, deleteOneUser)
    .patch(getOneUserMidll, patchOneUser)


export default router