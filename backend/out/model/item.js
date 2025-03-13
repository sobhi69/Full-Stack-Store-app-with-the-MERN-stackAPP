"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
itemSchema.pre('save', function () {
    if (!this.minPrice) {
        this.minPrice = this.price;
    }
    if (!this.category || this.category == '') {
        this.category = 'unkown';
    }
});
exports.default = mongoose_1.default.model('Item', itemSchema);
