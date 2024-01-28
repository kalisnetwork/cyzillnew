import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import userRouter from './api/routes/Users.route.js';
import authRouter from './api/routes/Auth.route.js';
import listingRouter from './api/routes/Listings.route.js';
import saveRouter from './api/routes/Saves.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/saves', saveRouter);

app.get("/api", function (req, res) {
    res.json({ message: "Cyzill api" });
});
app.get("/", function (req, res) {
    res.json({ message: "Cyzill Server Started" });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(err);

    let errorDetails = {};
    if (process.env.NODE_ENV === 'development') {
        errorDetails.stack = err.stack;
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...errorDetails,
    });
});
