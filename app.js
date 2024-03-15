import express from 'express';
import userRouter from "./routes/users.js";
import taskRouter from './routes/task.js'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

export const app = express();

config({
    path: "./data/config.env",
});

//using middleware's
app.use(express.json());
app.use(cookieParser());
//using routes
app.use("/api/v1/users", userRouter);  // /users we are creating prefix
app.use("/api/v1/task", taskRouter);
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get("/", (req,res) => {
   res.send("Nice Working");
});

app.use(errorMiddleware);   //error middleware
