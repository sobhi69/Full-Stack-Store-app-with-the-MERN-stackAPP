"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clientSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
clientSchema.pre('save', function () {
    if (this.address == '' || !this.address) {
        this.address = "no address provided";
    }
});
exports.default = mongoose_1.default.model('Client', clientSchema);
