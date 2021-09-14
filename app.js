const express = require("express");
const cors = require("cors");
const pokemonRoutes = require("./routes/pokemonsRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/api/pokemons", pokemonRoutes);

app.use("*", (req, res) => {
   res.status(404).json({
      status: "Fail",
      message: "The page you are trying to reached doesn't exist!",
   });
});

app.listen(port, () => {
   console.log(`Server runnig on port ${port}!`);
});
