const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MONGO_URI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify:false
		});
		console.log('MongoDB Connected.....');
	} catch (err) {
		console.error(err.message);
		//exit the process with error message
		process.exit(1);
	}
};

module.exports = connectDB;
