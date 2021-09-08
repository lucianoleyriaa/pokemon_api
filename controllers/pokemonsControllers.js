const axios = require("axios");

const getType = (pokemon) => {
   return pokemon.types.map((type) => type.type.name);
};

const getAbilities = (pokemon) => {
   return pokemon.abilities.map((ability) => ability.ability.name);
};

exports.getPokemons = async (req, res) => {
   try {
      let allPokemons = [];

      const pokemons = await axios({
         method: "GET",
         url: "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
      });

      allPokemons = pokemons.data.results.map((pokemon) => {
         return { name: pokemon.name };
      });

      let pokemonsName = allPokemons.map((pokemon) => pokemon.name);

      for (let i = 0; i < pokemonsName.length; i++) {
         const pokemonDetail = await axios({
            method: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonsName[i]}`,
         });

         allPokemons[i].type = getType(pokemonDetail.data);
         allPokemons[i].weight = pokemonDetail.data.weight;
         allPokemons[i].photo = pokemonDetail.data.sprites.front_default;
         allPokemons[i].abilities = getAbilities(pokemonDetail.data);
      }

      res.json({
         allPokemons,
      });
   } catch (e) {
      res.status(404).json({
         status: "Fail",
         message: e.message,
      });
   }
};

exports.getPokemonDetail = async (req, res) => {
   try {
      const pokemonId = req.params.id;

      console.log(pokemonId);

      res.status(200).json({
         status: "Success",
      });
   } catch (e) {
      res.status(400).json({
         status: "Fail",
         message: e.message,
      });
   }
};
