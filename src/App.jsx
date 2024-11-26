import React, { useState } from 'react'
import PokemonLogo from './components/PokemonLogo'
import PokemonSliderAnimation from './components/PokemonSliderAnimation'
import './App.css'
import PokemonFinder from './components/PokemonFinder'

function App() {
  const apiLink = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

  return (
    <>
        <PokemonLogo />
        <PokemonSliderAnimation apiLink={apiLink} />
        <PokemonFinder apiLink={apiLink} />
    </>
  )
}

export default App
