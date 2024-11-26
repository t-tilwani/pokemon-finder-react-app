const root = document.querySelector(`:root`);




const statBar = document.querySelectorAll(`.bar-container`) // different bar values within the style attribute

const slideTrack = document.getElementById(`slide-track`);


const randomPokeGen = async (count) => {//SELECTS RANDOM POKEMON FROM A SPECIFIC COUNT
    try{
        const pokeUrlArray = [];
        const pokeCount = 1302;
    
    
        await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/")
            .then((response) => response.json())
            .then((data) => {
                for(let i = 0; i < count; i++){
                pokeUrlArray.push(data.results[Math.floor(Math.random() * pokeCount - 1)].url);
            } 
        })
        return pokeUrlArray
    }catch(err){
        console.error(`randomPokeGen error: ${err}`)
    }

}

const slideImgGen = async (slideCount) => {// RETURNS THE POKEMON IMAGES SLIDES ARE ADDED FROM SLIDECOUNT (EXPECTEDSLIDECOUNT)
    try{
        const pokeUrls = await randomPokeGen(slideCount);
        const pokeImages = await Promise.all(pokeUrls.map(async (curr) => {
                return await fetch(curr)
                .then((response) => response.json())
                .then((data) => {
                    return data.sprites.front_default;
                })
                
        }))
        return pokeImages
    }
    catch(err){
        console.error(`yeah this is a error ${err}`)
    }
}

const insertPokeImgForSlide = async () => {//INSERTS PICTURES FOR ANIMATION SLIDE
    try{
        const expectedSlideCount = 50;
        slideTrack.innerHTML = ``;
        const imgArray = await slideImgGen(expectedSlideCount);
        let currPokeSlides = expectedSlideCount;

        for(let i = 0; i <= expectedSlideCount; i++){
            if(imgArray[i] !== undefined){
            slideTrack.innerHTML += `
                <div class="slide-el">
                  <img class="slide-img" src="${imgArray[i]}" alt="pokemon-img">
                </div>`                
            }else{
                currPokeSlides--;
            }
        }

        
        root.style.setProperty(`--slide-count`, currPokeSlides);
    }catch(err){
        console.error(`insertPokeImgForSlide error: ${err}`)
        window.location.reload()
    }
}
 



const displayPokemon = async (pokemonUrl) => {// DISPLAYS POKEMON CARD 
    try{
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonId = document.getElementById("pokemon-id")
        const imageContainer = document.getElementById("image");
        const typesContainer = document.getElementById("types");
        const weight = document.getElementById("weight");
        const height = document.getElementById("height");

        const statBar = document.querySelectorAll(".bar-container");
        const statArray = [document.getElementById("hp"), document.getElementById("attack"), document.getElementById("defense"), document.getElementById("special-attack"), document.getElementById("special-defense"), document.getElementById("speed")];
        const maxStats = [[244, "hp-bar"], [190, "attack-bar"], [194, "defense-bar"], [194, "sp-attack-bar"], [230, "sp-defense-bar"], [180, "speed-bar"]]
        typesContainer.innerHTML = ``


        await fetch(pokemonUrl)
            .then((response) => response.json())
            .then((data) => {
                pokemonName.innerText = data.name.toUpperCase();
                pokemonId.innerText = `#${data.id}`;
                imageContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">`;
                data.types.forEach((el) => {
                    typesContainer.innerHTML += `
                    <div id="${el.type.name}" style="--type: var(--${el.type.name})">
                        <p>${el.type.name}</p>
                    </div>`
                });
                weight.innerText = `weight: ${data.weight}`;
                height.innerText = `height: ${data.height}`;
                data.stats.forEach((el, index) => {
                    statArray[index].innerText = el.base_stat;
                    statBar[index].innerHTML = `<div style="--bar-value:${parseFloat(el.base_stat / maxStats[index][0]).toFixed(2) * 100}%" class="stat-bars" id="${maxStats[index][1]}"></div>`
                });
            })
    }
    catch(err){
        console.error(`displayPokemon error: ${err}`)
    }
}
 //displayPokemon("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/mr-mime")
 insertPokeImgForSlide()


//input
const input = document.getElementById("search-input")
const findBtn = document.getElementById("search-button")


const isValid = (pokeInput) => {
    const numRegex = /^#?\d+$/
    const textRegex = /^[A-Za-z-\s]+$/g
    const isInputNumber = numRegex.test(pokeInput)
    const isInputText = textRegex.test(pokeInput)


    if(isInputNumber){
        return {"number": Number(pokeInput.replace("#", ""))}
    }else if(isInputText){
        return {"text": pokeInput.replace(/\s+/g, "-").toLowerCase()}//this may cause issues due to replacing all the spaces 
    }else{
        alert("Pokémon not found")
    }
}

const pokemonDatabaseSearch = async (inputObj) => {
    try{
        let pokeUrl = "";
        if("number" in inputObj){
                await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
                .then((response) => response.json())
                .then((data) => {
                    data.results.forEach((el) => {
                        if(el.id === inputObj.number){
                            if(el.name){
                                pokeUrl = el.url;
                            }
                        }
                    })// find a way to make it create an alert if none of them find a pokemon
                    
                })

            return pokeUrl
            
        }
        if("text" in inputObj){
            await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
                .then((response) => response.json())
                .then((data) => {
                    data.results.forEach((el) => {
                        const nameRegex = new RegExp(el.name.replace(/\s+?-+?/g, ""))
                        if(inputObj.text === el.name){
                            if(el.name){

                                pokeUrl = el.url
                            }
                        } 
                    })
                })
        }
        return pokeUrl
    }
    catch(err){
        console.error(`pokemonDatabaseSearch error: ${err}`)
    }
}
const pokemonFinder = async (input) => {
    try{
        const pokeUrl = await pokemonDatabaseSearch(isValid(input));
        if(pokeUrl){
            document.getElementById("pokedex-container").style.display = "grid";
            displayPokemon(pokeUrl)
        }else{
            alert("Pokémon not found")
        }
    }
    catch(err){
        console.error(`pokemonFinder error: ${err}`)
    }
};

findBtn.addEventListener("click", () => pokemonFinder(input.value))

