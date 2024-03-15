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

const corsWithOptions = (req, res, next) => {
    const allowedOrigins = [process.env.FRONTEND_URL]; // List of allowed origins
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
};


//using middleware's
app.use(express.json());
app.use(cookieParser());
//using routes
app.use("/api/v1/users", userRouter);  // /users we are creating prefix
app.use("/api/v1/task", taskRouter);
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// Enable CORS with dynamic origin setting
app.use(corsWithOptions);

app.get("/", (req,res) => {
   res.send("Nice Working");
});

app.use(errorMiddleware);   //error middleware
