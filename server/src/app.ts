import express, { Express } from "express"
import mongoose, { ConnectOptions } from "mongoose"
import cors from "cors"
import router from "./routes"

const app: Express = express();

const PORT: string | number = process.env.REACT_APP_SERVER_PORT || 4000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(router);


const uri: string = `mongodb://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}/${process.env.REACT_APP_DB_NAME}?authSource=admin`;



mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Running ${PORT}`);
        });
    })
    .catch(error => {
        throw error;
    });