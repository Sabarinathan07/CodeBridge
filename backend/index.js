import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import cors from 'cors';
import authRoutes from "./routes/api/auth.js";
import userRoutes from "./routes/api/users.js";
import postRoutes from "./routes/api/posts.js";
import profileRoutes from "./routes/api/profile.js";

// Initialize env he
dotenv.config();

// Initialize express app
const app = express();

// Connecting Database
connectDB();

app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//       'Access-Control-Allow-Headers','x-auth-token',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     next();
//   });

// Middleware
app.use(express.json({ extended: false }));

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
