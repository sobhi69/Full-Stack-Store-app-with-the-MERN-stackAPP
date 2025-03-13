import mongoose, { InferSchemaType } from 'mongoose'

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    minPrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        default: "unkown",
        trim: true
    }
}, { timestamps: true })

itemSchema.pre('save',function () {
    if (!this.minPrice) {
        this.minPrice = this.price
    }
    if (!this.category || this.category == '') {
        this.category = 'unkown'
    }
})

type Item = InferSchemaType<typeof itemSchema>
export default mongoose.model<Item>('Item', itemSchema)
