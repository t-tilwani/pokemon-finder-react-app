import React, { useState, useEffect} from 'react';
import './component_styles/PokemonSliderAnimationStyle.css';





export default function PokemonSliderAnimation(props) {
    const {apiLink} = props

    const expectedSlideCount = 50;
    
    const [actualSlideCount, setActualSlideCount] = useState(expectedSlideCount)

    let animate = false;
    
    const [pokeCount, setPokeCount] = useState(null);
    const [pokeImagesArray, setPokeImagesArray] = useState([])





    useEffect(() => {

        fetch(apiLink)
            .then(response => response.json())
            .then(data => {
                setPokeCount(data.count)
                const randomUrls = [];


                for(let i = 0; i < expectedSlideCount; i++){
                    const randomUrl = data.results[Math.floor(Math.random() * (data.count - 1))].url
                    randomUrls.push(
                        fetch(randomUrl)
                            .then(res => res.json())
                            .then(pokemon => pokemon.sprites.front_default)
                            .catch(err => console.error(`Nested fetch error: ${err}`))
                );
                    
                }
                return Promise.all(randomUrls)
            })
            .then(pokemonImages => {
                setPokeImagesArray(pokemonImages.filter(image => image !== undefined))
                setActualSlideCount(pokemonImages.filter(image => image !== undefined).length)
                
            })
            .catch(err => console.error(`Fetch error: ${err}`))
            
            
    }, [])

    return(
        <>
            <div id="pokemon-slider-container" style={{"--slide-count": actualSlideCount}}>
              <div id="slide-track">
                {pokeImagesArray.map((el, index) => {
                    return(
                    <div key={index} className="slide-el">
                        <img key={index + 'image'} className="slide-img" src={el} alt="pokemon-img" />
                    </div>)
                    })
                }
              </div>
            </div>
        </>
    )
};