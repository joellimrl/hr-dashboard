const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router.js");
const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () =>
  console.log(`HR Dashboard Middleware listening on port ${port}!`)
);
