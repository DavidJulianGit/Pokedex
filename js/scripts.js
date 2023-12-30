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
    
        return {
            add: add,
            getAll: getAll
        };
    }
)();

// adding a pokemon to the list
pokemonRepository.add({name: "Pikachu", height: 0.4, types: ["Electro"]});



//get div container
const container = document.getElementById("pokemon--container");

// iterate over pokemonList
pokemonRepository.getAll().forEach( (pokemon) => {
   
    // save name and height in cache-variable
    let pokemonProps = pokemon.name + " ( height: " + pokemon.height + " )";  

    // conditional
    if(pokemon.height >= 0.6)
    {
        pokemonProps += " - Wow, that's big!"     
    }

    // insert div element with pokemon info into container
    container.innerHTML += `<div class="pokemon"> ${pokemonProps} </div>`; 
    }
)  
   
