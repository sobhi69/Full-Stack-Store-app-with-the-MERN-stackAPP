"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connectToDb_1 = require("./lib/connectToDb");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const user_1 = __importDefault(require("./routes/user"));
const client_1 = __importDefault(require("./routes/client"));
const auth_1 = __importDefault(require("./routes/auth"));
const item_1 = __importDefault(require("./routes/item"));
const sale_1 = __importDefault(require("./routes/sale"));
// routes
app.use('/api/user', user_1.default);
app.use('/api/client', client_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/item', item_1.default);
app.use('/api/sale', sale_1.default);
(0, connectToDb_1.connectToDb)();
connectToDb_1.connection.once('open', () => {
    console.log(`connected to Database`);
    app.listen(port, () => console.log(`web is alive at http://localhost:${port}`));
});
