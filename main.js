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

    //display strength and weakness of selected pokemon
    async function getWeakness() {
        const url3 = await fetch('weakness.json');
        const res3 = url3.json();
        return res3
    }
    
    const weakness = document.querySelector('.weakness');
    const strength = document.querySelector('.strength');
    //showing weaknesses
    getWeakness().then( (data) => {
        if ( weakness.hasChildNodes()) {
            while (weakness.firstChild) {
                weakness.firstChild.remove()
            }
        }
        let para = document.createElement('p');
        para.innerText = 'weakness';
        weakness.appendChild(para);

        let a = [];
        for (let i=0; i < pokemon.types.length; i++) {
        let namesOfWeaknessForEachType = data[`${pokeTypes[i].innerText}`][0].weakness;
        // console.log(namesOfWeaknessForEachType); 
        a = a.concat(namesOfWeaknessForEachType);
        // console.log(a)
        aWithNoDupes = a.filter( (each, pos) => { 
            return a.indexOf(each) == pos }) 
        }
        for (let i=0; i < aWithNoDupes.length; i++) {
            let newDiv3 = document.createElement('div')
            newDiv3.classList.add('type', `${aWithNoDupes[i]}`)
            newDiv3.innerText = aWithNoDupes[i]
            // console.log(newDiv3)
            weakness.appendChild(newDiv3);
        }
    })
    //showing strengths
    getWeakness().then( (data) => {
        if ( strength.hasChildNodes()) {
            while (strength.firstChild) {
                strength.firstChild.remove()
            }
        }
        let para = document.createElement('p');
        para.innerText = 'strength';
        strength.appendChild(para);
        
        let b = [];
        for (let i=0; i < pokemon.types.length; i++) {
        let namesOfStrengthForEachType = data[`${pokeTypes[i].innerText}`][1].strength;
        // console.log(namesOfStrengthForEachType); 
        b = b.concat(namesOfStrengthForEachType);
        // console.log(b)
        bWithNoDupes = b.filter( (each, pos) => { 
            return b.indexOf(each) == pos }) 
        }
        for (let i=0; i < bWithNoDupes.length; i++) {
            let newDiv3 = document.createElement('div')
            newDiv3.classList.add('type', `${bWithNoDupes[i]}`)
            newDiv3.innerText = bWithNoDupes[i]
            // console.log(newDiv3)
            strength.appendChild(newDiv3);
        }
    })

}









//autocomplete//

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

    // console.log(resultsNameOnly);

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

<<<<<<< HEAD
=======

>>>>>>> 15b899e0d0be1988c25a8f7f56103c6b12da82ad
const tl = gsap.timeline();
tl
    .from('.pokeball-container', { duration: 1.5, y: '-30%', ease:'bounce'})
    .to('.pokeball-container', { duration: 0.4, rotate: '20deg'})
    .to('.pokeball-container', { duration: 0.4, rotate: '-20deg'})
    .to('.pokeball-container', { duration: 0.5, rotate: '90deg'})
    .to('.pokeball-top', { duration: 0.1, opacity:'0' })
    .to('.pokeball-btm', { duration: 0.1, opacity:'0'}, '<')
    .to('.block1', { duration: 1, x: '-100%'}, '<')
    .to('.block2', { duration: 1, x: '100%'}, '<')
    .to('.form-container', { zIndex: 1} )
<<<<<<< HEAD
=======

>>>>>>> 15b899e0d0be1988c25a8f7f56103c6b12da82ad
