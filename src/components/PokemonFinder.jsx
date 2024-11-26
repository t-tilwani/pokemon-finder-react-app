import React, {useState, useEffect} from 'react';
import PokemonStats from './PokemonStats';
import PokemonDetails from './PokemonDetails'

export default function PokemonFinder(props) {
  const {apiLink} = props;

  const [userInput, setUserInput] = useState('');
  const [pokeUrl, setPokeUrl] = useState('');
  const [pokeStats, setPokeStats] = useState(null)

  const handleChange = ({target}) => {
    setUserInput(target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    findPokemon(isValid(userInput));
    setUserInput('');
  }
  //


  const isValid = (userInput) => {
      const numRegex = /^#?\d+$/
      const textRegex = /^[A-Za-z-\s]+$/g
      const isInputNumber = numRegex.test(userInput)
      const isInputText = textRegex.test(userInput)
  
      if(isInputNumber){
          return {"number": Number(userInput.replace("#", ""))}
      }else if(isInputText){
          return {"text": userInput.replace(/\s+/g, "-").toLowerCase()}
      }else{
          alert("Pokémon not found");
      }
  }
  
  useEffect(() => {
    if(pokeUrl){
      console.log(pokeUrl)
      pokemonStats(pokeUrl)
    }
  }, [pokeUrl])

  const findPokemon = (userInputType) => {
    if("number" in userInputType){
      fetch(apiLink)
        .then((response) => response.json())
        .then((data) => {
          let url;
          data.results.forEach((el) => {
            if(el.id === userInputType.number){
                if(el.name){
                  url = el.url;

                  setPokeUrl(el.url);
                }
              }
            })
          if(!url){
            alert("Pokémon not found");
          }
        })
        .catch(err => {console.error(`Id fetch error: ${err}`)}) 
    }
    if("text" in userInputType){
      fetch(apiLink)
        .then((response) => response.json())
        .then((data) => {
          let url;
          data.results.forEach((el) => {
            if(userInputType.text === el.name){
              if(el.name){
                url = el.url;
                setPokeUrl(el.url)
              }} 
          })
          if(!url){
            alert("Pokémon not found");
          }
        })
        .catch(err => {console.error(`Name fetch error: ${err}`)})  
    }
  }

  const pokemonStats = (pokeUrl) => {
    fetch(pokeUrl)
      .then(response => response.json())
      .then(data => {
        setPokeStats(data)
      })
      .catch(err => console.error(`pokemonStats fetch error: ${err}`))
  }

  return(
      <div id="container">
              <form  onSubmit={handleSubmit} >
                  <label htmlFor="search-input">Find your Pokémon!</label>
                  <input value={userInput} onChange={handleChange}  type="text" id="search-input" required placeholder="Name or #id" autoComplete="off" />
                  <button type="submit" id="search-button">Find</button>
              </form>
              
              {pokeStats && (
              <div id="pokedex-container" >
                <PokemonDetails stats={pokeStats} /* name={name} id={id} image={image} types={types} weight={weight} height={height} */ />
                <PokemonStats stats={pokeStats} /* hp={hp} attack={attack} defense={defense} spAttack={spAttack} spDefense={spDefense} speed={speed} */ />
              </div>)}
          </div>
  )
}