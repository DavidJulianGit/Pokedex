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
            button.addEventListener("click", (e) => showDetails(pokemon, e) );
            
            //assign css classes
            li.classList.add('pokemon-li');
            button.classList.add('pokemon-button');

            //append button to listitem
            li.appendChild(button);
            
            //append listItem to list
            list.appendChild(li);
        }

        function showModal(pokemon, e)
        {
            let modalContainer = document.querySelector("#modal-container");
           
            // Clear existing modal content
            modalContainer.innerHTML = "";

            // Add Eventlistener to container to check if user clicked outside of the modal itself
            modalContainer.addEventListener("click", (e) => {
                if(e.target === modalContainer) 
                {
                    hideModal();
                }
            })
            
            let modal = document.createElement("div");
            modal.classList.add("modal");       

            // Add modal content
            let closeButtonElement = document.createElement("img");
            closeButtonElement.addEventListener("click", hideModal);
            closeButtonElement.classList.add("modal-close");
            closeButtonElement.src = "./img/modal-close.png";
            
           
            
            let imageElement = document.createElement("img");
            imageElement.src = pokemon.imageUrl;
            imageElement.alt = "Image of a Pokemon called " + pokemon.name;

            let pokemonName = document.createElement("h1");
            pokemonName.innerText = pokemon.name;
            pokemonName.classList.add("modal-pokemon-name")

            let heightHeadline = document.createElement("h3");
            heightHeadline.classList.add("modal-h3")
            heightHeadline.innerText = "Height"

            let pokemonHeight = document.createElement("p");
            pokemonHeight.innerText = pokemon.height * 10 + " cm";
            pokemonHeight.classList.add("modal-pokemon-text")
            
            let typesHeadline = document.createElement("h3");
            typesHeadline.classList.add("modal-h3")
            typesHeadline.innerText = "Types"

            let typesContainer = document.createElement("ul");
            typesContainer.classList.add("modal-pokemon-types-ul");

            pokemon.types.forEach(type => {
                let li = document.createElement("li");
                li.innerText = type.type.name;
                li.classList.add("modal-pokemon-text");
                typesContainer.appendChild(li);
            });

            modal.appendChild(closeButtonElement);
            modal.appendChild(imageElement);
            modal.appendChild(pokemonName);
            modal.appendChild(heightHeadline);
            modal.appendChild(pokemonHeight);
            modal.appendChild(typesHeadline)
            modal.appendChild(typesContainer)

            modalContainer.appendChild(modal)
            modalContainer.classList.add("is-visible");

            // Position the modal centered right under the button clicked
            modal.style.top = e.target.offsetTop+e.target.offsetHeight+16+"px";
            modal.style.left =  e.target.offsetLeft +
                                e.target.offsetWidth/2 -
                                modal.getBoundingClientRect().width/2 +
                                "px";
        }

        // Hiding modal via removing is-visible class
        function hideModal()
        {
            let modalContainer = document.querySelector("#modal-container");
            modalContainer.classList.remove("is-visible");
        }

        // Listen for keypresses - esc -> close modal
        window.addEventListener("keydown", (e) => {
            let modalContainer = document.querySelector("#modal-container");
            if(e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                modalContainer.classList.remove("is-visible");
            }
        });

        function showDetails(pokemon, e)
        {
            loadDetails(pokemon).then( () => {
                console.log(pokemon);
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



   
