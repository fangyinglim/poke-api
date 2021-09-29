//fetch pokeapi
const getName = async function pokemonList() {
    const pokeNameFromUser = await whenUserSubmits(); //returns a promise when user submits 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNameFromUser}`; //using string literal
    const res = await fetch(url); 
    // returns a promise when you 'fetch', instead of using .then, 
    // we use await. this means we (1) fetch the data first, 
    // then 'await' stalls JS from assigning to const res 
    // until the promise is resolved, then assigns it to const.
    const pokemon = await res.json(); //returns another promise when resolved
    console.log(pokemon);
    // getPokemon(pokemon);
    return pokemon; //doesnt return data, returns another promise 
}

getName().then( (data) => {
    getPokemon(data);
}); 

function getPokemon(pokemon) {
    console.log(pokemon.name);
    document.querySelector('.pokemonName').innerText = pokemon.name; 
}

//created a promise to return input from user//
function whenUserSubmits() {
    return new Promise ((resolve, reject) => {
        document.getElementById('submit-btn').onclick = (event) => {
            event.preventDefault();
            const nameTemp2 = document.getElementById('pokemonNameFromUser').value;
            resolve(nameTemp2);
        }
    })
}
///////////////////////////////////////////////

























// let nameofPokemonSubmittedByUser = '';
//     document.getElementById('submit-btn').onclick = function getPokeNameFromUser(event) {
//     return new Promise ( (resolve, reject) => {
//         event.preventDefault(); //stop form from submitting
//         nameofPokemonSubmittedByUser = document.getElementById('pokemonName').value;
//         resolve(nameofPokemonSubmittedByUser);
// })}
//retrieve user input into 'nameofPokemonSubmittedByUser' variable
// let nameofPokemonSubmittedByUser = '';
// document.getElementById('submit-btn').onclick = function getName(event) {
//     return new Promise ((resolve, reject)=> {
//         event.preventDefault(); //stop form from submitting
//         nameofPokemonSubmittedByUser = document.getElementById('pokemonName').value;
//         resolve(nameofPokemonSubmittedByUser);
//     })
//     .then((message) => (console.log(message))
    
//     )}