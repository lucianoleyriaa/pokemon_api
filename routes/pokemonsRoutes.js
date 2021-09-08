const Router = require("express").Router;
const pokemonsControllers = require("../controllers/pokemonsControllers");

const router = Router();

router.route("/").get(pokemonsControllers.getPokemons);

module.exports = router;
