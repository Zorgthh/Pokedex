import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {Home} from "./components/pages/home/home"
import { ListPokemonsContainer } from './components/fetch/ListPokemonsContainer'
import { PokemonDetail } from './components/fetch/pokemonDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      
      <Routes>
        <Route path='/Pokemons' element={<ListPokemonsContainer/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
