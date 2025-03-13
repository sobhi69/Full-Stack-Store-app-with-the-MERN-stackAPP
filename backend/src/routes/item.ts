import express from 'express'
const router = express.Router()
import {
    createOneItem,
    getItems,
    deleteAllItems,
    getOneItemMidll,
    retrieveOneItem,
    deleteOneItem,
    patchOneItem
} from '../controllars/item';

router.get('/get-items', getItems)
router.post('/create', createOneItem)
router.delete('/delete-all-items', deleteAllItems)

router.route('/:id')
    .get(getOneItemMidll, retrieveOneItem)
    .delete(getOneItemMidll, deleteOneItem)
    .patch(getOneItemMidll, patchOneItem)



export default router