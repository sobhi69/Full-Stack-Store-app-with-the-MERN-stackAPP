import mongoose ,{ InferSchemaType } from 'mongoose' 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true,
        unique:true
    },
    phone: {
        type: String,
        default:"",
        max: 11
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    // [00s,00m]
    role: {
        type: String,
        default:"User"
    },
    accessToken: {
        type:String,
        default:""
    }
},{timestamps:true})

type User = InferSchemaType<typeof userSchema>

export default mongoose.model<User>('User', userSchema)