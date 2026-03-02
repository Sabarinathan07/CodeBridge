import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from "./routes/api/auth.js";
import userRoutes from "./routes/api/users.js";
import postRoutes from "./routes/api/posts.js";
import profileRoutes from "./routes/api/profile.js";

// Initialize env
dotenv.config();

// Initialize express app
const app = express();

// Security Middleware
app.use(helmet()); // Sets various security headers
app.disable('x-powered-by'); // Hide server information

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        msg: "Too many requests from this IP, please try again after 15 minutes"
    }
});

// Apply rate limiting to all API routes
app.use("/api", limiter);

// CORS Configuration
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Connecting Database
connectDB();

// Body Parser Middleware
app.use(express.json({ limit: '10kb', extended: false })); // Limit body size to prevent DoS


// app.get('/', (req, res) => res.send('Api working!!'))
app.get("/", (req, res) => {
    res.json("Hello World!");
});



// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
    res.send("Hello!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
