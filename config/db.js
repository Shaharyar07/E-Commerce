const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDb Atlas!");
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};
module.exports = connectToMongo;
