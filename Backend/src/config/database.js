
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connetToDB = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to dBase");
  });
};
module.exports = connetToDB;
