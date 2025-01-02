import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import 
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

// Routes Declareation

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use(errorHandler);

export { app };