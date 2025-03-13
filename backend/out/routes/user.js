"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllars/user");
const router = express_1.default.Router();
router.get('/get-users', user_1.getAllusers);
router.route('/:id')
    .get(user_1.getOneUserMidll, user_1.retrieveOneUser)
    .delete(user_1.getOneUserMidll, user_1.deleteOneUser)
    .patch(user_1.getOneUserMidll, user_1.patchOneUser);
exports.default = router;
