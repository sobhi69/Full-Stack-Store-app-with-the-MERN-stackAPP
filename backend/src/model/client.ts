import mongoose, { InferSchemaType } from 'mongoose'

const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        max: 11,
        required: true
    },
    address: {
        type: String,
        default: "no address provided"
    }

}, { timestamps: true })

clientSchema.pre('save', function () {
    if (this.address == '' || !this.address) {
        this.address = "no address provided"
    }
})

type Client = InferSchemaType<typeof clientSchema>
export default mongoose.model<Client>('Client', clientSchema)