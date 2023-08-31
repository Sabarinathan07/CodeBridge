const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connecting Database
connectDB();

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

//Serve static assests in production
// if (process.env.NODE_ENV === 'production') {
// 	// Set static folder
// 	app.use(express.static('client/build'));

// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// 	});
// }

app.get('/',(req,res) =>{
	res.send("Hello!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
