const express = require("express");
const pokemonRoutes = require("./routes/pokemonsRoutes");

const app = express();

app.use("/api/pokemons", pokemonRoutes);

app.listen(3000, () => {
   console.log("Server runnig on port 3000");
});
