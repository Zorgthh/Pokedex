import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import logo from "../imgs/Pokédex_logo.png";

export const NavbarP = ({ darkMode, toggleDarkMode }) => {
  return (
    <Navbar>
      <NavbarBrand>
        <img src={logo} className="w-16 h-auto" alt="Pokedex Logo" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Contactame
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Pokemons">
            Pokemons
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="flex-end">
        <Button auto flat onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </NavbarContent>
    </Navbar>
  );
};
