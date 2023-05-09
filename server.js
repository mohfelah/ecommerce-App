import express from "express";
import colors from "colors"
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";

import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoryRoutes.js"
import productRouter from "./routes/productRoutes.js"

import cors from "cors";


//configure env
dotenv.config();
//database connect
connectDB();

//rest object
const app = express();



//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

//rest api
app.get('/', (req,res) =>{
    res.send({
        message: 'welcome to ecommerce application'
    })
})

//PORT
const PORT = process.env.PORT || 5000;
//run listen
app.listen(PORT,(err) =>{
    err ? console.log(err)
        : console.log(`server running on ${process.env.DEV_MODE} port ${PORT}`.bgCyan.white)
})