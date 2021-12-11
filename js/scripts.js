
// create pokemon list
let pokemonRepository = ( // Repository variable to hold what IIFE returns
  function() { //IIFE function to store pokemon list
    let pokemonList = []; //declare pokemonList as empty array
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100'; //declare variable for pokemonAPI url
    let modal = document.querySelector('#pokedex'); //select bootstrap modal from HTML elements

    //function to fetch data from pokemon API, as a promise
    function loadList() {
      return fetch(apiUrl) //function to fetch json file from api URL, return promise
        .then(function (response){ //if fetch is resolved, return response json file
          return response.json(); //function to parse json file to object
        })
        .then(function (json){ //if fetch is resolved, json object
          json.results.forEach(function(item){ //in .results property, loop each item
            let pokemon = { //declare pokemon object with name and url key value pairs
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon); //add each pokemon object to pokemonList array
          })
        })
        .catch(function(err){ //if fetch is rejected, function to alert errot
          alert.error(err);
        })
      }

    //function to load detail of each pokemon, taking detailsUrl from function loadList
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl; //declare url taking detailsUrl from func loadList
      return fetch(url) //function to fetch json file from detailsUrl
      .then(function(response){ //function to parse json file to object
        return response.json()
      })
      .then(function(details){ //from object (parsed from json)
        //declare pokemon details including height, weight, types and image
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types;
        pokemon.imageUrl = details.sprites.front_default
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
    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
        showModal(pokemon);
      });
    }

    //function to show modal for pokemon detail
    function showModal(pokemon) {

      // Select bootstrap modal elements
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      //clear existing modal
      modalTitle.empty();
      modalBody.empty();

      //create element for name in modal content
      let nameElement = $('<h1>' + pokemon.name + '</h1>');

      // create element for image in modal content
      let imageElement = $('<img class="modal-image" src="">');
      imageElement.attr('src', pokemon.imageUrl); //add pokemon image source attribute

      // create element for height in modal content
      let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

      // create element for weight in modal content
      let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

      // create element for type in modal content
      let typeElement = $('<p>' + 'Type: ' + pokemon.types + '</p>');

      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);

      $('#pokedex').modal();
    }

    // return getAll function, add function and addListitem functions
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal
    };
  }
)();


//forEach loop to call each pokemon from getAll function to pass to addListItem function
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
