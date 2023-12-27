let pokemonList = [];

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

//cache variable
let pokemonProps = ""

//get div container
const container = document.getElementById("pokemon--container");

// iterate over pokemonList
for(i=0; i < pokemonList.length; i++)
{   
    // save name and height in cache-variable
    pokemonProps = pokemonList[i].name + " ( height: " + pokemonList[i].height + " )";  

    // conditional
    if(pokemonList[i].height >= 0.6)
    {
        pokemonProps += " - Wow, that's big!"     
    }

    // insert div element with pokemon info into container
     container.innerHTML += `<div class="pokemon"> ${pokemonProps} </div>`; 
}