import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { NavbarP } from '../../navbar/NavbarP';
import './Home.css';

export const Home = () => {
  const [user, setUser] = useState('Ash Oshowat');
  const [showPokedex, setShowPokedex] = useState(false);

  const handlePokedexToggle = () => {
    setShowPokedex(!showPokedex);
  };

  return (
    <div className="home-container">
      <NavbarP />
      <div className="intro-section">
        <h1>¡Hola, entrenador Pokémon!</h1>
        <div className="input-section">
          <p>¿Cuál es tu nombre?:</p>
          <Input
            isClearable
            type="text"
            label="User"
            variant="bordered"
            placeholder="Ash Oshowat"
            defaultValue={user}
            onClear={() => setUser('')}
            onChange={(e) => setUser(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <p>¡Bienvenido, {user}!</p>
      </div>

      
    </div>
  );
};
