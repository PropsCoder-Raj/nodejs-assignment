require('dotenv').config();
const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("💚 DB GOT CONNECTED"))
    .catch((err) => {
      console.log("❤️ DB CONNECTION ISSUE");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDb;