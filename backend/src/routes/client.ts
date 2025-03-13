import express from 'express'
import {
    createOneClient,
    getAllClients
} from '../controllars/client'
const router = express.Router()

router.post('/create', createOneClient)
router.get('/get-clients', getAllClients)



export default router