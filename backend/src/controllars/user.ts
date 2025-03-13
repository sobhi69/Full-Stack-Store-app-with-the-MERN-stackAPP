import { NextFunction, Request, Response } from "express";
import UserModel from "../model/user";
import bcrypt from 'bcrypt'

export const getAllusers = async (req: Request, res: Response) => {
    try {
        const allUsers = await UserModel.find()
        res.json(allUsers)
    } catch (error: any) {
        console.error(`error in getAllUsers ${error}`)
        res.status(500).json({ message: error.message })
    }
}

interface RequestUser extends Request {
    user?: any
}


export const getOneUserMidll = async (req: RequestUser, res: Response, next: NextFunction) => {
    let user
    const id = req.params.id

    try {
        user = await UserModel.findById(id)
        if (!user) {
            res.status(404).json({ message: `user with ${id} doesn't exist in DB` })
            return
        }
    } catch (error: any) {
        console.error(`error in getOneUserMidll ${error}`)
        res.status(500).json({ message: error.message })
    }
    req.user = user
    next()
}

export const retrieveOneUser = async (req: RequestUser, res: Response) => {
    res.json(req.user)
}

export const deleteOneUser = async (req: RequestUser, res: Response) => {
    const id = req.user._id

    try {
        await UserModel.findByIdAndDelete(id)
        res.json({ message: "user has been deleted seccessfuly" })
    } catch (error: any) {
        console.error(`error in deleteOneUser ${error}`)
        res.status(500).json({ message: error.message })
    }
}

interface UserUpdateInfo {
    username: string,
    oldPassword?: string,
    newPassword?: string
    confirmPassword?: string,
    email: string,
    phone: string,
}

export const patchOneUser = async (req: RequestUser, res: Response) => {
    const user = req.user
    const {
        username,
        oldPassword,
        email,
        phone,
        newPassword,
        confirmPassword
    }: UserUpdateInfo = req.body

    // if (phone && phone.length == 11) {
    //     user.phone = phone
    // }
    // if (email) {
    //     user.email = email
    // }
    // if (username) {
    //     user.username = username
    // }

    let newHashedPassword
    if (oldPassword) {
        const match = await bcrypt.compare(oldPassword, user.password)
        if (!match) {
            res.status(400).json({ message: "wrong password!" })
            return
        }

        if (!newPassword) {
            res.status(400).json({ message: "please provide the new password!" })
            return
        }
        if (newPassword != confirmPassword) {
            res.status(400).json({ message: "new password and confrim password don't match" })
            return
        }
        newHashedPassword = await bcrypt.hash(newPassword, 10)
    }


    try {
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
            phone: !phone ? user.phone : phone,
            username: !username ? user.username : username,
            email: !email ? user.email : email,
            password: !newHashedPassword ? user.password : newHashedPassword,

        }, { new: true })
        res.json(updatedUser)
    } catch (error: any) {
        console.error(`error in patchOneUser ${error}`)
        res.status(500).json({ message: error.message })
    }
}

