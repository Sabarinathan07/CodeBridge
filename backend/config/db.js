const mongoose = require("mongoose");
const db = process.env.MONGO_URI;
const db_operations = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, db_operations);
    console.log("MongoDB Connected.....");
  } catch (err) {
    console.error(err.message);
    //exit the process with error message
    process.exit(1);
  }
};

module.exports = connectDB;
