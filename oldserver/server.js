//MongoDB & Express
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const items = require("./routes/api/Shortcuts");

// const app = express();

// //Bodyparser

// app.use(bodyParser.json());

// //DB Config
// const db = require("./config/keys").mongoURI;

// //connect to mongo
// mongoose
//   .connect(db)
//   .then(() => console.log("mongoDB connected..."))
//   .catch(err => console.log(err));

// //use routes
// app.use("/api/shortcuts", items);

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`server started on port ${port}`));
