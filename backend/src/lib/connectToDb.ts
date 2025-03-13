import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI || '')
    } catch (error) {
        console.error(`error connectToDb ${error}`)
    }
}

export const connection = mongoose.connection