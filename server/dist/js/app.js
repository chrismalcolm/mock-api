"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.REACT_APP_SERVER_PORT || 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
const uri = `mongodb://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}/${process.env.REACT_APP_DB_NAME}?authSource=admin`;
mongoose_1.default
    .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Running ${PORT}`);
    });
})
    .catch((error) => {
    throw error;
});
