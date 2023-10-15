const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const port = process.env.RUNNING_PORT;
//Connect to DB start server.

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, function () {
      console.log("Server is running from  " + port);
    });
  })
  .catch((err) => console.log(err));
