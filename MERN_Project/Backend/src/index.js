import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 400;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at Port: ${port}`);

        })
    })
    .catch((error) => {
        console.log(`MONGO connection Fail!! `, error);

    });