import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css';
import { Spinner } from "@nextui-org/react";
import { NavbarP } from '../navbar/NavbarP';

export const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((err) => console.error("Error fetching Pokemon details:", err));
  }, [name]);

  if (!pokemon) return <div className='container-spinner'><Spinner /></div>;

  return (
    <div>
      <NavbarP/>
      <div className="pokemon-detail">
      <div className="pokemon-card">
        <div className="pokemon-header">
          <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={`${pokemon.name} artwork`} className="pokemon-artwork" />
        </div>
        <div className="pokemon-body">
          <div className="pokemon-images">
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} className="sprite-img" />
            {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} className="sprite-img" />}
          </div>
          <div className="pokemon-info">
            <div className="info-item">
              <strong>Height:</strong> {pokemon.height / 10} m
            </div>
            <div className="info-item">
              <strong>Weight:</strong> {pokemon.weight / 10} kg
            </div>
            <div className="info-item">
              <strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}
            </div>
            <div className="info-item">
              <strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
            </div>
          </div>
          <div className="pokemon-stats">
            <h3>Stats:</h3>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className="stat-item">
                <span className="stat-name">{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</span>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>
          <div className="pokemon-moves">
            <h3>Moves:</h3>
            <div className="moves-grid">
              {pokemon.moves.slice(0, 10).map(move => (
                <div key={move.move.name} className="move-card">
                  <h4>{move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)}</h4>
                  <p>Type: {move.move.url.split('/')[6]}</p>
                  <p>Power: Unknown</p> {/* Placeholder for power if available */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};
