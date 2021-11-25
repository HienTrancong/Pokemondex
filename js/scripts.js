
// create pokemon list
let pokemonRepository = ( // Repository variable to hold what IIFE returns
  function() { //IIFE function to store pokemon list
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

    //function to fetch data from pokemon API, as a promise
    function loadList() {
      return fetch(apiUrl)
        .then(function (response){
          return response.json();
        })
        .then(function (json){
          json.results.forEach(function(item){
            let pokemon = {name: item.name, detailsUrl: item.url};
            add(pokemon);
            console.log(pokemon);
          })
        })
        .catch(function(err){
          console.error(err);
        })
      }

    //function to return all item in pokemon list
    function getAll() {
      return pokemonList;}

    //function to add new pokemon in if the input is object and has correct keys
    function add(pokemon) {
      if
        (typeof(pokemon) !== 'object')
        {alert('This is not object type');}
      else if
        ((Object.keys(pokemon)[0] != 'name') || (Object.keys(pokemon)[1] != 'detailsUrl'))
        {alert('Not correct keys');}
      else
        (pokemonList.push(pokemon)); //statement to add new pokemon item
    }

    //function to load detail of each pokemon, taking detailsUrl from function loadList
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
      .then(function(response){
        return response.json()
      })
      .then(function(details){
        item.height = details.height;
        item.types = details.types;
        item.imageUrl = details.sprites.front_default
      })
      .catch(function(err){
        console.error(err);
      })
    }

    //function to take the click event listener trigger to log pokemon
    function showDetails(item){
      pokemonRepository.loadDetails(item)
      .then(function(){
        console.log(item)
      });
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

    // return getAll function, add function and addListitem functions
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    }
  }
)();


//forEach loop to call each pokemon from getAll function to pass to addListItem function
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
