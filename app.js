const express = require("express");

const app = express();

app.use("/", (req, res) => {
   res.json({
      message: "Hello world!",
   });
});

app.listen(3000, () => {
   console.log("Server runnig on port 3000");
});
