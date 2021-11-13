
// create simple pokemon list
  let pokemonList = [
    {name : 'Bulbasaur', height : 0.7, type : ['grass','poison'], ability : ['chlorophyll','overgrow']},
    {name : 'Charmander', height : 0.6, type : ['fire'], ability : ['blaze','solar-power']},
    {name : 'Squirtle', height : 0.5, type : ['water'], ability : ['rain-dish','torrent']},
    {name : 'Butterfree', height : 1.1, type : ['bug','flying'], ability : ['compoundeyes','tinted-lens']}
  ];

// calling the pokemon names and heights
  // for ( let i = 0; i < pokemonList.length; i++)
  //   {
  //     // mark a pokemon based on a condition
  //     if (pokemonList[i].height >= 1) {document.write('<p>'+pokemonList[i].name +' '+'(height: '+pokemonList[i].height+') '+'Wow, that\'s a big pokemon!'+'</p>');}
  //     else {document.write('<p>'+pokemonList[i].name + ' '+'(height: '+pokemonList[i].height+')'+'</p>');}
  //   }

// calling all pokemon using forEach

function getPokemonList(pokemon)
  {
    document.write(
      '<p>'
      + pokemon.name + '</br>'
      + 'Height: ' + pokemon.height + '</br>'
      + 'Type: ' + pokemon.type + '</br>'
      + 'Ability: ' + pokemon.ability + '</br>'
      +'</p>');
  }

pokemonList.forEach(getPokemonList);
