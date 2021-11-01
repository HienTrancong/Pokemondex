let pokemonList = [
  {name : 'Bulbasaur', height : 0.7, type : ['grass','poison'], ability : ['chlorophyll','overgrow']},
  {name : 'Charmander', height : 0.6, type : ['fire'], ability : ['blaze','solar-power']},
  {name : 'Squirtle', height : 0.5, type : ['water'], ability : ['rain-dish','torrent']},
  {name : 'Butterfree', height : 1.1, type : ['bug','flying'], ability : ['compoundeyes','tinted-lens']}
];


for ( let i = 0; i < pokemonList.length; i++)
  {
    if (pokemonList[i].height >= 1) {document.write(pokemonList[i].name + ' '+'(height: '+pokemonList[i].height+') '+'Wow, that\'s a big pokemon!'+ '<br>');}
    else {document.write(pokemonList[i].name + ' '+'(height: '+pokemonList[i].height+')' +'<br>');}
  }
