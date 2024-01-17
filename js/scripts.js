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
            let list     = document.querySelector('#pokemon-ul');

            //create li-element and button
            let li       = document.createElement("li");
            let pokeButton   = document.createElement("button");

            //give button text and eventListener
            pokeButton.innerText = pokemon.name;
            pokeButton.addEventListener("click", (e) => showDetails(pokemon, e) );
            
            //assign css classes
            li.classList.add('list-group-item');
            li.classList.add('list-group-item-action');
            li.classList.add('list-group-item-primary');

            pokeButton.classList.add('btn');
            
            pokeButton.setAttribute('data-bs-toggle', 'modal');
            pokeButton.setAttribute('data-bs-target', '#pokeModal');

            // append button to listitem
            li.appendChild(pokeButton);
            
            // append listItem to list
            list.appendChild(li);
        }

        function showModal(pokemon, e)
        {
            // capitalize the pokemons name
            let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            
            // Set title 
            let modalTitle = document.getElementById("modalTitle");
            modalTitle.innerText = name;
            
            // Set img
            let modalImg = document.getElementById("modalImg");
            modalImg.setAttribute("src", pokemon.imageUrl);
            modalImg.setAttribute("alt", "Image of a Pokemon namend " + name);

            // Set height
            let modalHeight = document.getElementById("modalHeight");
            modalHeight.innerText = pokemon.height * 10 + " cm";
            
            let modalTypes = document.getElementById("modalTypes");
            // Empty modalTypes ul
            modalTypes.innerHTML = '';

            // Fill modalTypes ul with pokemon-types 
            pokemon.types.forEach( item => {
                console.log(item.type.name)
                let li = document.createElement("li");
                li.classList.add("list-group-item");
                li.classList.add("border-0")
                li.classList.add("p-0")
                li.innerText = item.type.name;
                modalTypes.appendChild(li);
            })
        }


        function showDetails(pokemon, e)
        {
            loadDetails(pokemon).then( () => {
                showModal(pokemon, e)   
            });
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
            let list = document.querySelector('#pokemon-ul');

            //create li-element and button
            let li = document.createElement("li");
            
            //assign css class, text-content and id, which is used for removing the element
            li.classList.add('list-group-item');
            li.classList.add('list-group-item-action');
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



   
