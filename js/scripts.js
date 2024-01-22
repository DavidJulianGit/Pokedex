let pokemonRepository = (
    function () 
    {
        let pokemonList = [];
        let filteredPokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        let modalImg = document.getElementById('modalImg');
        let modalTitle = document.getElementById('modalTitle');
        let modalHeight = document.getElementById('modalHeight');
        let modalWeight = document.getElementById('modalWeight');
        let modalTypes = document.getElementById('modalTypes');

        // function for adding a pokemon object to pokemonList
        function add(pokemon) 
        {
            pokemonList.push(pokemon);  
        }
        
        // return the whole list of pokemon
        function getAll() {
            return pokemonList;
        }

        // Inject listitems into the DOM
        function addListItem(pokemon) {

            //get the unordered list 
            let list     = document.querySelector('#pokemon-ul');

            //create li-element and button
            let li       = document.createElement('li');
            let pokeButton   = document.createElement('button');

            //give button text and eventListener
            pokeButton.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokeButton.addEventListener('click', (e) => showDetails(pokemon) );
            
            //assign css classes
            li.classList.add('list-group-item');
            li.classList.add('list-group-item-action');
            li.classList.add('text-center');
            li.classList.add('px-0');
            

            pokeButton.classList.add('btn');
            pokeButton.classList.add('list-btn');
            pokeButton.classList.add('w-100');
            //pokeButton.classList.add('text-truncate');
            pokeButton.setAttribute('data-bs-toggle', 'modal');
            pokeButton.setAttribute('data-bs-target', '#pokeModal');

            //append button to listitem
            li.appendChild(pokeButton);
            
            //append listItem to list
            list.appendChild(li);
        }

        function deleteAllListitems()
        {
            let list     = document.querySelector('#pokemon-ul');
            list.innerHTML = '' ;
        }

        function showModal(pokemon)
        {
    
            // capitalize the pokemons name
            let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            modalTitle.innerText = name;
          
            modalImg.setAttribute('src', pokemon.imageUrl);
            modalImg.setAttribute('alt', 'Image of a Pokemon namend ' + name);

            modalHeight.innerText = pokemon.height * 10 + ' cm';
            
            modalWeight.innerText = pokemon.weight / 10 + ' kg';
            
            // Empty modalTypes ul
            modalTypes.innerHTML = '';

            // Fill modalTypes ul 
            pokemon.types.forEach( item => {
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                li.classList.add('border-0')
                li.classList.add('p-0')
                li.classList.add('m-0')
                li.classList.add('text-capitalize')
                li.innerText = item.type.name;
                modalTypes.appendChild(li);
            })
        }
        function resetModal()
        {
            modalImg.removeAttribute('src');
            modalImg.removeAttribute('alt');
            modalTitle.innerText = '';
            modalHeight.innerText = '';
            modalWeight.innerText = '';
            modalTypes.innerHTML = '';
        }

        function showDetails(pokemon)
        {
            resetModal();

            loadDetails(pokemon).then( () => {
                showModal(pokemon)   
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
                    json.results.forEach( (item, index) => {
                        
                        let pokemon = {
                                        name: item.name,
                                        detailsUrl: item.url,
                                        index: index
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
                    console.log(details);
                    // Now we add the details to the item
                    item.imageUrl = details.sprites.front_default;
                    item.height = details.height;
                    item.weight = details.weight;
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
            let li = document.createElement('li');
            
            //assign css class, text-content and id, which is used for removing the element
            li.classList.add('list-group-item');
            li.classList.add('list-group-item-action');
             
            li.id = 'loading'
            const loadingSpinnerHTML = `
                                        <div class="d-flex justify-content-center">
                                            <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        `;
            li.innerHTML = loadingSpinnerHTML;
            //append listItem to list
            list.appendChild(li);
        }

        function hideLoadingMessage(){
            // get and remove loadingMessage element
            const loadingMessage = document.getElementById('loading');
            loadingMessage.remove();
        }

        // Sort an array by given key
        function sortArrayByKey(array, key){
            return array.sort( (a, b) => 
            {
                if (a[key] < b[key]) 
                {
                    return -1;
                } 
                else if (a[key] > b[key]) 
                {
                    return 1;
                } 
                else 
                {
                    return 0;
                }
            });
        }

        // Sorts the list, delets currents listitems and add in the newly sorted items
        function sortListBy(key){
            // key can either be 'name' or 'index'

            let sortedList = [];

            // if no search has been performed, filteredPokemonList is empty
            if(filteredPokemonList.length > 0)
            {
                 // get the sorted list
                sortedList = sortArrayByKey(filteredPokemonList, key);  
            }
            else{
                 // get the sorted list
                 sortedList = sortArrayByKey(pokemonList, key); 
            }
           
            console.log(sortedList);
            // remove listitem from repository
            deleteAllListitems();

            // add items to DOM
            sortedList.forEach( (pokemon) => {
                addListItem(pokemon);
            });
        }

        // Function to filter the PokemonList based search-field input
        function filterListBy(searchTerm) {
            
            const filteredData = pokemonList.filter( item => {
                //return item.name.toLowerCase().includes(searchTerm.toLowerCase());
                return item.name.slice(0, searchTerm.length) === searchTerm;
            });
            filteredPokemonList = filteredData.slice();

            deleteAllListitems();

            // add items to DOM
            filteredPokemonList.forEach( (pokemon) => {
                addListItem(pokemon);
            });
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            deleteAllListitems: deleteAllListitems,
            sortListBy: sortListBy,
            filterListBy: filterListBy
        };
    }
)();

// Setting up EventListeners
let btnSortByName = document.getElementById('btn-sort-name');
let btnSortByIndex = document.getElementById('btn-sort-index');
let inputSearch = document.getElementById('search');
let btnResetSearch = document.getElementById('btnResetSearch');

btnSortByName.addEventListener('click', () => pokemonRepository.sortListBy('name') );
btnSortByIndex.addEventListener('click', () => pokemonRepository.sortListBy('index') );
search.addEventListener('input', (e) => {
    // if input value is empty, resetButton is disabled
    if(e.target.value === '')
    {
        btnResetSearch.disabled = true;
    }
    else{
        btnResetSearch.disabled = false;
    }

    pokemonRepository.filterListBy(e.target.value)
});
btnResetSearch.addEventListener('click', () => {
    // reset search input value
    search.value = '';
    // reset list through filtering by ''
    pokemonRepository.filterListBy('');
    //disable resetButton
    btnResetSearch.disabled = true;
});

// Putting the ListItems into the DOM
pokemonRepository.loadList().then( () => {
    pokemonRepository.getAll().forEach( (pokemon) => {
        pokemonRepository.addListItem(pokemon);
        }
    );
})



   
