
// create pokemon list
let pokemonRepository = ( // Repository variable to hold what IIFE returns
  //IIFE function to store pokemon list
  function() {
    //declare pokemonList as empty array
    let pokemonList = [];
    //declare variable for pokemonAPI url
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
    //select bootstrap modal from HTML elements
    let modal = document.querySelector('#pokemonModal');

  //START function to load data from API to pokemonList array ----------------------
    function loadList() {
      //fetch json file from api URL, return promise
      return fetch(apiUrl)
      //if fetch is resolved, return response json file
      .then(function (response){
        return response.json();//parse json file to object
      })
      //if fetch is resolved, from json object
      .then(function (json){
        json.results.forEach(function(item){ //in .results property, loop each item
          let pokemon = { //declare pokemon object with name and url key value pairs
            name: item.name,
            detailsUrl: item.url
          };
          //add each pokemon object to pokemonList array
          add(pokemon);
        });
      })
      //if fetch is rejected, function to alert error
      .catch(function(err){
        alert.error(err);
      })
    }
  //END function to load data from API to pokemonList array ----------------------

  //START function to load detail of each pokemon, taking detailsUrl from function loadList
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl; //declare url taking detailsUrl from func loadList
      // fetch json file from detailsUrl, return promise
      return fetch(url)
      // if fetch is resolved, return response json file
      .then(function(response){
        return response.json() //parse json file to object
      })
      // if fetch is resolved, from object (parsed from json) add information to pokemon detail
      .then(function(details){
        //declare pokemon details including height, weight, types and image
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types;
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default
      })
      .catch(function(err){ //if fetch is rejected, function to alert error
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
           pokemon_listItem.classList.add('group-list-item');
       //create button and button class for each pokemon
       let listButton = document.createElement('button');
           listButton.innerText = pokemon.name;
           listButton.classList.add('listButton', 'btn-outline-info', 'btn-block');
           listButton.setAttribute('data-target','#pokemonModal');
           listButton.setAttribute('data-toggle','modal');
       //appendChild button inside pokemon listItem, and listItem inside list
       pokemon_listItem.appendChild(listButton);
       pokemon_list.appendChild(pokemon_listItem);

       //Add pokemon image to listButton
       loadDetails(pokemon).then(function() {
        let imgDiv = document.createElement('div');
        listButton.appendChild(imgDiv);

        let pokemonButtonImg = document.createElement('img');
        pokemonButtonImg.setAttribute('src',pokemon.imageUrlFront);
        imgDiv.appendChild(pokemonButtonImg);
        })

       //even click listerner to trigger function showDetails
       listButton.addEventListener('click', function(){
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
      let imageFrontElement = $('<img class="modal-image-front" src="">');
      imageFrontElement.attr('src', pokemon.imageUrlFront); //add pokemon image source attribute

      // create element for image in modal content
      let imageBackElement = $('<img class="modal-image-back" src="">');
      imageBackElement.attr('src', pokemon.imageUrlBack); //add pokemon image source attribute

      // create element for height in modal content
      let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

      // create element for weight in modal content
      let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

      // create element for type in modal content
      let typeElement = $('<p>' + 'Type: ' + pokemon.types + '</p>');

      modalTitle.append(nameElement);
      modalBody.append(imageFrontElement);
      modalBody.append(imageBackElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);

      $('#pokemonModal').modal();
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
