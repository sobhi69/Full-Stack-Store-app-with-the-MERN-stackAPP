"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        default: "",
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
        default: "User"
    },
    accessToken: {
        type: String,
        default: ""
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);
