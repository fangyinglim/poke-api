//fetch pokeapi
document.querySelector('#submit-btn').addEventListener('click', function (event) {
    event.preventDefault();
    const nameOfPokeSubmittedByUser = document.querySelector('#pokemonNameFromUser').value;
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOfPokeSubmittedByUser}`;
    
    (async function getName() {
        const res = await fetch(url); 
        // returns a promise when you 'fetch', instead of using .then, 
        // we use await. this means we (1) fetch the data first, 
        // then 'await' stalls JS from assigning to const res 
        // until the promise is resolved, then assigns it to const.
        const pokemon = await res.json(); //returns another promise when resolved
        console.log(pokemon);
        return pokemon; //doesnt return data, returns another promise 
    })()
    .then( (data) => {
        // console.log(data.name);
        getPokemon(data);
        })
        .catch( (err) => {
            console.log(err)
            document.querySelector('#error-msg').classList.add('appear');
            document.querySelector('#error-msg').innerText = 'Please input a valid pokemon name';
            setTimeout(() => {
                document.querySelector('#error-msg').classList.remove('appear');
                document.querySelector('#error-msg').innerText = '';
            }, 3500);
         })   
    
})

function getPokemon(pokemon) {
    //shows pokemon name
    document.querySelector('.pokemonName').innerText = pokemon.name; 
    //shows picture of pokemon
    let imgSrc = pokemon.sprites.front_default;
    document.querySelector('.pokePic').src = imgSrc;
    //shows pokemon type
    if ( document.querySelector('.pokeType').hasChildNodes()) {
            console.log(document.querySelector('.pokeType').firstChild);
            while (document.querySelector('.pokeType').firstChild) {
                document.querySelector('.pokeType').firstChild.remove()}
                // }
                // } 
                
            }
    console.log(pokemon.types.length);
    for (let i=0; i < pokemon.types.length; i++) {
              
        let newDiv = document.createElement('div');
        newDiv.classList.add('type');
        newDiv.innerHTML = pokemon['types'][i]['type']['name'];
        document.querySelector('.pokeType').appendChild(newDiv);
        console.log(pokemon['types'][i]['type']['name'])
        
    };
    
}








