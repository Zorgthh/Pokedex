import React, { createContext, useContext, useState } from 'react';

// Crear el contexto para el modo oscuro
const DarkModeContext = createContext();

// Proveedor del contexto
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useDarkMode = () => useContext(DarkModeContext);
