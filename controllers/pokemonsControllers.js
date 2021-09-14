const axios = require("axios");
const {
   getType,
   getDescription,
   getAbilities,
   getMoves,
} = require("../utils/functionalities");

exports.getPokemons = async (req, res) => {
   try {
      const { limit, offset } = req.query;
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${
         limit ? limit : 10
      }&offset=${offset ? offset : 0}`;
      let allPokemons = [];

      const pokemons = await axios({
         method: "GET",
         url,
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

         allPokemons[i].id = pokemonDetail.data.id;
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
      let pokemonDetail = {};
      const pokemonId = req.params.id;

      const pokemon = await axios({
         method: "GET",
         url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      });

      const pokemonDescription = await axios({
         method: "GET",
         url: `https://pokeapi.co/api/v2/characteristic/${pokemonId}`,
      });

      pokemonDetail.name = pokemon.data.name;
      pokemonDetail.type = getType(pokemon.data);
      pokemonDetail.weight = pokemon.data.weight;
      pokemonDetail.photo = pokemon.data.sprites.front_default;
      pokemonDetail.abilities = getAbilities(pokemon.data);
      pokemonDetail.description = getDescription(
         pokemonDescription.data.descriptions
      );
      pokemonDetail.moves = getMoves(pokemon.data.moves);

      res.status(200).json({
         status: "Success",
         pokemon: pokemonDetail,
      });
   } catch (e) {
      res.status(400).json({
         status: "Fail",
         message: e.message,
      });
   }
};
