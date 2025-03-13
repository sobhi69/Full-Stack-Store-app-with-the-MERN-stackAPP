import mongoose , { InferSchemaType, Schema } from 'mongoose' 

const Item = {
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
}

const saleSchema = new mongoose.Schema({
    cardItems: {
        type:[Item],
        required:true
    },
    client:{
        type:Schema.Types.ObjectId,
        ref:"Client",
        required:false
    },
    salesPerson : {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:false
    },
    total: {
        type:Number,
        required:true
    },
    discount: {
        type:Number,
        default:0
    },
    addition: {
        type:Number,
        default:0
    }

},{timestamps:true})


type Sale = InferSchemaType<typeof saleSchema>
export default mongoose.model<Sale>('Sale',saleSchema)