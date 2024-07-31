// import { useState } from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { pokemonNames } from './data/pokemonNames'

function App() {
  const [pokemonObjects, setPokemonObjects] = useState(() => JSON.parse(localStorage.getItem('pokemonJson') ?? '[]'));

  useEffect(() => {
    async function getPokemonObjects() {
      const fetchRequests = pokemonNames.map((pokemon) => {
        try {
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        } catch (e) {
          console.log(`Error: ${e}`);
        }
      });
      const fetchResponses = await Promise.all(fetchRequests);

      if (!fetchResponses.includes(undefined)) {
        const pokemon = await Promise.all(fetchResponses.map((response) => response.json()));
        setPokemonObjects(pokemon.map((pokemonObj) => (
          { 'id': pokemonObj.id, 'name': pokemonObj.name, 'sprites': pokemonObj.sprites.other.dream_world.front_default }))
        )
        localStorage.setItem('pokemonJson', JSON.stringify(pokemonObjects));
      } else {
        setPokemonObjects({ id: 1, name: 'test', sprites: 'http://test.com' })
      }
    }


    console.log(pokemonObjects)
    if (pokemonObjects.length === 0) {
      console.log("Fetching DATA!")
      getPokemonObjects();
    } else {
      console.log("In local storage")
    }
  }, [pokemonObjects])

  return (
    <>
    </>
  )
}

export default App
