import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListPokemons.css';
import { PaginationP } from './pagination';
import { NavbarP } from '../navbar/NavbarP';

export const ListPokemonsContainer = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [productsPerPage] = useState(28);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch types once when the component mounts
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesRes = await fetch('https://pokeapi.co/api/v2/type');
        const typesData = await typesRes.json();
        setTypes(typesData.results);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  // Fetch Pokémon data with or without filters
  useEffect(() => {
    const fetchPokemons = async () => {
      let apiUrl = '';
      const offset = (currentPage - 1) * productsPerPage;

      if (selectedType) {
        // Fetch Pokémon of a specific type with pagination
        apiUrl = `https://pokeapi.co/api/v2/type/${selectedType}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const allPokemons = data.pokemon.map(p => p.pokemon);
          const paginatedPokemons = allPokemons.slice(offset, offset + productsPerPage);

          // Fetch detailed data for the paginated Pokémon
          const pokemonPromises = paginatedPokemons.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
          );
          const detailedPokemons = await Promise.all(pokemonPromises);
          setPokemons(detailedPokemons);
          setTotalPokemons(allPokemons.length); // Set total for pagination
        } catch (error) {
          console.error('Error fetching Pokémon of type:', error);
        }
      } else {
        // Fetch Pokémon for the current page
        apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${productsPerPage}&offset=${offset}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const results = data.results;

          // Fetch detailed Pokémon data
          const pokemonPromises = results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
          );
          const detailedPokemons = await Promise.all(pokemonPromises);
          setPokemons(detailedPokemons);
          setTotalPokemons(data.count); // Set total number of Pokémon for pagination
        } catch (error) {
          console.error('Error fetching Pokémon:', error);
        }
      }
    };

    fetchPokemons();
  }, [currentPage, selectedType]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <NavbarP darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Filtros */}
      <div className="filters-container">
        <div className="filter">
          <label>Filtrar por Tipo:</label>
          <select
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1); // Reset to the first page when changing filter
            }}
            value={selectedType}
          >
            <option value="">Todos los Tipos</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pokemon-grid">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
              <h2>
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              </h2>
              {pokemon.sprites && pokemon.sprites.front_default ? (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              ) : (
                <p>No image available</p>
              )}
              {/* Mostrar estadísticas básicas */}
              <div className="pokemon-stats">
                <p><strong>HP:</strong> {pokemon.stats[0].base_stat}</p>
                <p><strong>Ataque:</strong> {pokemon.stats[1].base_stat}</p>
                <p><strong>Defensa:</strong> {pokemon.stats[2].base_stat}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron Pokémon.</p>
        )}
      </div>
      
      <PaginationP 
        productsPerPage={productsPerPage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalPoke={totalPokemons} // Ajustar el total de Pokémon según los datos obtenidos
      />
    </div>
  );
};
