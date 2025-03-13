import express from 'express'
const router = express.Router()
import {
    logout,
    refreshToken,
    register,
    signIn
} from '../controllars/auth'


router.post('/register', register)
router.post('/sign-in', signIn)
router.get('/refresh', refreshToken)
router.get('/logout', logout)

export default router