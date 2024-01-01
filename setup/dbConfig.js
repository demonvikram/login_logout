const mongoose=require("mongoose")
require("dotenv").config()


//connected the database
exports.connect = async() => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Data Base is connected");
  } catch (error) {
    console.log("Failed to connect Database");
    process.exit(1)
  }
};