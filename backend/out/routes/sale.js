"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sale_1 = require("../controllars/sale");
const router = express_1.default.Router();
router.post('/create', sale_1.createSale);
exports.default = router;
