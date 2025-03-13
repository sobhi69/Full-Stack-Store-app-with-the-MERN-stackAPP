import express from 'express'
import { createSale } from '../controllars/sale'
const router = express.Router()

router.post('/create',createSale)


export default router