let pokemonRepository = (
    function () 
    {
        let pokemonList = [];

        // Prototype of the pokemon object for easy comparison
        const pokemonPrototype = {
            name: "",
            height: "",
            types: []
        }

        // pokemon added by hand 
        pokemonList[0] = {
            name:   "Bulbasaur" ,
            height: 0.7,
            types:  ["grass", "poison"]
        };
        
        pokemonList[1] = {
            name:   "Charmander" ,
            height: 0.6,
            types:  ["fire"]
        };
        
        pokemonList[2] = {
            name:   "Squirtle " ,
            height: 0.5,
            types:  ["water"]
        };
        
        // function for comparing two arrays
        const compareArrays = (a, b) =>
         a.length === b.length && a.every((element, index) => element === b[index]);

        // function for adding a pokemon object to pokemonList
        function add(pokemon) {
            // Check if pokemon is indeed an object
            if(typeof pokemon === "object")
            {
                // check if pokemon-object has the correct keys
                if( compareArrays(Object.keys(pokemon), Object.keys(pokemonPrototype)) )
                {
                    pokemonList.push(pokemon) 
                }        
            } 
        }
        
        // return the whole list of pokemon
        function getAll() {
            return pokemonList;
        }

        // adding pokemon to the List
        function addListItem(pokemon) {
            //get the unordered list 
            let list        = document.querySelector('.pokemon-list');

            //create li-element and button
            let listItem    = document.createElement("li");
            let button      = document.createElement("button");

            //give button text, css class and eventListener
            button.innerText = pokemon.name;
            button.classList.add('.pokemon');
            button.addEventListener("click", () => showDetails(pokemon) );

            //append button to listitem
            listItem.appendChild(button);
            
            //append listItem to list
            list.appendChild(listItem);
        }

        function showDetails(pokemon){
            console.log(pokemon);
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem
        };
    }
)();

// adding a pokemon to the list
pokemonRepository.add({name: "Pikachu", height: 0.4, types: ["Electro"]});


// iterate over pokemonList
pokemonRepository.getAll().forEach( (pokemon) => {
    
    pokemonRepository.addListItem(pokemon);
    }
);
   
