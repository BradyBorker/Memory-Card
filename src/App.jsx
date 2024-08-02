import { useEffect, useState, useRef } from 'react'
import Card from './components/Card';
import './App.css'

function App() {
  const [pokemonObjects, setPokemonObjects] = useState(() => JSON.parse(localStorage.getItem('pokemonJson') ?? []));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const clickedPokemonCards = useRef([]);

  useEffect(() => {
    async function getPokemonObjects() {
      try {
        const fetchRequest = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=12&limit=12');
        const fetchResponse = await fetchRequest.json();
        const pokemonArray = fetchResponse.results;

        const pokemonRequests = await Promise.all(pokemonArray.map((pokemon) => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)));
        const pokemon = await Promise.all(pokemonRequests.map((pokemon) => pokemon.json()));

        setPokemonObjects(shuffleArray(pokemon))
        localStorage.setItem('pokemonJson', JSON.stringify(pokemon));
      } catch (error) {
        console.log(error)
      }
    }

    if (pokemonObjects.length === 0) getPokemonObjects();
  }, [pokemonObjects])

  const clickPokemonCard = (name) => {
    if (clickedPokemonCards.current.includes(name)) {
      clickedPokemonCards.current = [];
      return setScore(0);
    }

    setPokemonObjects(shuffleArray(pokemonObjects));
    setScore(score + 1);
    if (score + 1 > highScore) setHighScore(highScore + 1)

    clickedPokemonCards.current.push(name);
  }

  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Pokemon Memory Game</h1>
          <p>Gain points by clicking cards. Do not click the same card twice!</p>
        </div>
        <div className="score-counter">
          <div className="score">
            <h3>Score: {score}</h3>
          </div>
          <div className="high-score">
            <h3>HighScore: {highScore}</h3>
          </div>
        </div>
      </div>
      <div className="pokemon-cards">
        {pokemonObjects.map((pokemonObject) => (
          < Card key={pokemonObject.id} onClick={clickPokemonCard} name={pokemonObject.name} sprite={pokemonObject.sprites.other.dream_world.front_default} />
        ))}
      </div>
    </>
  )
}

function shuffleArray(array) {
  for (let i = 0; i < array.length; i += 1) {
    const randomIndex = Math.floor(Math.random() * (array.length - 1));
    const holder = array[i];

    array[i] = array[randomIndex];
    array[randomIndex] = holder
  }

  return array
}

export default App
