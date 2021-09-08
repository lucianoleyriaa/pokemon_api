const getType = (pokemon) => {
   return pokemon.types.map((type) => type.type.name);
};

const getAbilities = (pokemon) => {
   return pokemon.abilities.map((ability) => ability.ability.name);
};

const getMoves = (moves) => {
   return moves.map((move) => move.move.name);
};

const getDescription = (descriptions) => {
   let des = "";

   descriptions.forEach((description) => {
      if (description.language.name === "es") {
         des = description.description;
      }
   });

   return des;
};

module.exports = { getType, getAbilities, getMoves, getDescription };
