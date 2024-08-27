const express = require('express');
require("dotenv").config();
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const cors = require('cors');

//connecting Database
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

//middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Api working!!'))
app.get("/",(req,res) =>{
    res.json("Hello World!")
})

//define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));



app.get('/',(req,res) =>{
	res.send("Hello!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
