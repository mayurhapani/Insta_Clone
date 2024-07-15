const express = require("express");
const app = express();

require("dotenv").config();

app.listen(process.env.PORT || 0, () => {
  console.log("server stated on http://localhost:" + process.env.PORT);
});
