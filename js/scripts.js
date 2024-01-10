let pokemonRepository = (
    function () 
    {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


        // function for adding a pokemon object to pokemonList
        function add(pokemon) 
        {
            pokemonList.push(pokemon);  
        }
        
        // return the whole list of pokemon
        function getAll() {
            return pokemonList;
        }

        // adding pokemon to the List
        function addListItem(pokemon) {

            //get the unordered list 
            let list     = document.querySelector('.pokemon-ul');

            //create li-element and button
            let li       = document.createElement("li");
            let button   = document.createElement("button");

            //give button text and eventListener
            button.innerText = pokemon.name;
            button.addEventListener("click", () => showDetails(pokemon) );
            
            //assign css classes
            li.classList.add('pokemon-li');
            button.classList.add('pokemon-button');

            //append button to listitem
            li.appendChild(button);
            
            //append listItem to list
            list.appendChild(li);
        }

        function showDetails(pokemon)
        {
            loadDetails(pokemon).then( () => console.log(pokemon));
        }
        
        function loadList() 
        {
            showLoadingMessage();
           
            return fetch(apiUrl)
                .then( (response) => {
                    hideLoadingMessage();
                    return response.json();
                })
                .then( (json) => {
                    json.results.forEach( (item) => {
                        let pokemon = {
                                        name: item.name,
                                        detailsUrl: item.url
                                      };
                        add(pokemon);
                    });
                })
                .catch( (e) => {
                    hideLoadingMessage();
                    console.error(e);
                 })
        }

        function loadDetails(item) 
        {
            let url = item.detailsUrl;

            return fetch(url)
                .then( (response) => {
                    return response.json();
                })
                .then( (details) => {
                    // Now we add the details to the item
                    item.imageUrl = details.sprites.front_default;
                    item.height = details.height;
                    item.types = details.types;
                })
                .catch( (e) => {
                    console.error(e);
                });
        }

        function showLoadingMessage(){
            //get ul element
            let list = document.querySelector('.pokemon-ul');

            //create li-element and button
            let li = document.createElement("li");
            
            //assign css class, text-content and id, which is used for removing the element
            li.classList.add('pokemon-li');
            li.innerText = "Loading - Please wait."
            li.id = "loading"        

            //append listItem to list
            list.appendChild(li);
        }

        function hideLoadingMessage(){
            // get and remove loadingMessage element
            const loadingMessage = document.getElementById("loading");
            loadingMessage.remove();
        }
        
        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails
        };
    }
)();

pokemonRepository.loadList().then( () => {
    pokemonRepository.getAll().forEach( (pokemon) => {
        pokemonRepository.addListItem(pokemon);
        }
    );
})



   
