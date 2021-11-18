
// create pokemon list
let pokemonRepository = ( // Repository variable to hold what IIFE returns
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

    // function to take each properties from forEach to create button for each pokemon
    function addListItem(pokemon) {
      let pokemon_list = document.querySelector('.pokemon-list');
      let pokemon_listItem = document.createElement('li');
      //create button and button class for each pokemon
      let button = document.createElement('button');
          button.innerText = pokemon.name;
          button.classList.add('pokemonbutton');
      //appendChild button inside pokemon listItem, and listItem inside list
      pokemon_listItem.appendChild(button);
      pokemon_list.appendChild(pokemon_listItem);
      //even click listerner to trigger function showDetails
      button.addEventListener('click', function(){
        showDetails(pokemon)
        }
      );
    }

    //function to take the click event listener trigger to log pokemon
    function showDetails(pokemon) {
      console.log(pokemon);
    }

    // return getAll function, add function and addListitem functions
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem
    }
  }
)();

//adding 1 pokemon into the list
pokemonRepository.add({name : 'Pikachu', height : 1, type : ['Electric'], ability : ['static']})

//forEach loop to call each pokemon from getAll function to pass to addListItem function
pokemonRepository.getAll().forEach( function(pokemon) {
  pokemonRepository.addListItem(pokemon);}
);
