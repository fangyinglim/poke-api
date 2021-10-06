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
            document.querySelector('.pokemonName').innerText = '';
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
                document.querySelector('.pokeType').firstChild.remove()
            }
    }
    console.log(`this pokemon has ${pokemon.types.length} type(s)`);
    for (let i=0; i < pokemon.types.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('type');
        newDiv.innerHTML = pokemon['types'][i]['type']['name'];
        document.querySelector('.pokeType').appendChild(newDiv);
        // console.log(pokemon['types'][i]['type']['name'])
    };
    
    //change style for pokemon type
    const pokeTypes = document.getElementsByClassName('type');
    for (let i=0; i < pokemon.types.length; i++) {
        console.log(pokeTypes[i].innerText);
        if (pokeTypes[i].innerText === `${pokeTypes[i].innerText}`) {
            pokeTypes[i].classList.add(`${pokeTypes[i].innerText}`);
            // pokeTypes[i].className += ` ${pokeTypes[i].innerText}`; //this works as well
        }
    }  


    
}

//autocomplete (still WIP)//

//clears search when reset button is clicked
document.querySelector('#reset-btn').addEventListener('click', () => {
    document.querySelector('#matchList').innerHTML = '';
})
//list of suggested pokemon names appear when user keys in letters
document.querySelector('#pokemonNameFromUser').addEventListener('keyup', searchPokemon);

const inputValue = document.querySelector('#pokemonNameFromUser').value

async function searchPokemon(inputValue) {
    console.log(inputValue.target.value);
    const url2 = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1118');
    const res2 = await url2.json();
    // console.log(res2.results);
    // res2.results.forEach( each => console.log(each.name))
    
    let results = await res2.results.filter( each => {
        const regEx = new RegExp ( `^${inputValue.target.value}`, 'gi' ) ;
        return each.name.match(regEx);
    })
//clears the search when there is no input in search bar
    if (inputValue.target.value.length === 0) {
        results = [];
    }
    // list of pokemon names is returned as an arg to function outputResults, 
    // where divs are created to show user suggested pokemon names
    outputResults(results);

}

function outputResults(results) {
     
    let matchList = document.querySelector('#matchList')
    // console.log(matchList.firstChild);
    if ( matchList.hasChildNodes()) {
        while (matchList.firstChild) {
            matchList.firstChild.remove(); 
    }}
    
    resultsNameOnly = results.map( each => {return each.name})

    console.log(resultsNameOnly);

    document.createElement('div')

    for (let i=0; i<resultsNameOnly.length; i++) {
        let newDiv2 = document.createElement('div');
        newDiv2.classList.add('searchStyle', 'selection')
        newDiv2.innerHTML = resultsNameOnly[i];
        document.querySelector('#matchList').appendChild(newDiv2);
    }

    //when pokemon name from autopopulated list is clicked, value gets submitted
    let list = document.querySelectorAll('.selection');
    list.forEach( each => each.addEventListener('click', (each) => {
        document.querySelector('#pokemonNameFromUser').value = each.target.innerText
        document.querySelector('#matchList').innerHTML = '';
        document.querySelector("input[type='submit']").click();
    }))

    
}


// console.log(document);
// let count = -1;
// document.getElementById('pokemonNameFromUser').addEventListener('keypressed', (event) => {
//     console.log(event.key)
//     if (event.key === 'ArrowDown') {
//         count++;
//     }
//     console.log(count)
//     testing(count);
// })

