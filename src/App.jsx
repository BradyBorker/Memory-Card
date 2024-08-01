// import { useState } from 'react'
import { useEffect, useState } from 'react'
import './App.css'

// { 'id': pokemon.id, 'name': pokemonObj.name, 'sprites': pokemonObj.sprites.other.dream_world.front_default }

function App() {
  const [pokemonObjects, setPokemonObjects] = useState(() => JSON.parse(localStorage.getItem('pokemonJson') ?? []));

  useEffect(() => {
    async function getPokemonObjects() {
      try {
        const fetchRequest = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=12&limit=12');
        const fetchResponse = await fetchRequest.json();
        const pokemonArray = fetchResponse.results;

        const pokemonRequests = await Promise.all(pokemonArray.map((pokemon) => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)));
        const pokemon = await Promise.all(pokemonRequests.map((pokemon) => pokemon.json()));

        setPokemonObjects(pokemon)
        localStorage.setItem('pokemonJson', JSON.stringify(pokemon));
      } catch (error) {
        console.log(error)
        setPokemonObjects({ id: 1, name: 'test', sprites: 'http://test.com' })
      }
    }

    pokemonObjects.length === 0 && getPokemonObjects();
  }, [pokemonObjects])


  return (
    <>
    </>
  )
}

export default App
