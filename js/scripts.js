
// create pokemon list
let pokemonRepository = ( // pokemon Repository variable to hold IIFE what returns
  function() { //IIFE function to store pokemon list
    let pokemonList = [
      {name : 'Bulbasaur', height : 0.7, type : ['grass','poison'], ability : ['chlorophyll','overgrow']},
      {name : 'Charmander', height : 0.6, type : ['fire'], ability : ['blaze','solar-power']},
      {name : 'Squirtle', height : 0.5, type : ['water'], ability : ['rain-dish','torrent']},
      {name : 'Butterfree', height : 1.1, type : ['bug','flying'], ability : ['compoundeyes','tinted-lens']}
    ];
    function getAll() {return pokemonList;}
    function add(pokemon) {
      if
        (typeof(pokemon) !== 'object') // condition to filter only input with object data type
        {alert('This is not object type');} //statement alert if not object type
      else if
        ((Object.keys(pokemon)[0] != 'name') || (Object.keys(pokemon)[1] != 'height') || (Object.keys(pokemon)[2] != 'type') || (Object.keys(pokemon)[3] != 'ability')) // condition to filter only correct keys
        {alert('Not correct keys');} //statement alert if incorrect keys
      else
        (pokemonList.push(pokemon)); //statement to add new pokemon item
    }
    return {
      getAll: getAll,
      add: add
    }
  }
)();

// function calling each polemon in array using forEach
function getPokemonList(pokemon) {
  document.write (
    '<p>'
    + 'Name: ' + pokemon.name + '</br>'
    + 'Height: ' + pokemon.height + '</br>'
    + 'Type: ' + pokemon.type + '</br>'
    + 'Ability: ' + pokemon.ability + '</br>'
    + '</p>'
  );
}

pokemonRepository.getAll().forEach(getPokemonList);
