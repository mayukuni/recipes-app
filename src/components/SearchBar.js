import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState({
    searchText: '',
    filterRadio: 'ingredient',
  });

  const location = useLocation();

  const { handleSearch } = useContext(RecipeContext);

  function handleGenericInput({ target: { name, value } }) {
    setSearchInput({ ...searchInput, [name]: value });
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        name="searchText"
        onChange={ handleGenericInput }
        className="search-input"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        disabled={ (searchInput.searchText.length === 0) }
        onClick={ () => handleSearch(searchInput, location.pathname) }
        className="search-button"
      >
        Buscar
      </button>
      <label htmlFor="search-ingredients">
        <input
          id="search-ingredients"
          type="radio"
          data-testid="ingredient-search-radio"
          name="filterRadio"
          value="ingredient"
          onChange={ handleGenericInput }
        />
        Ingredientes
      </label>
      <label htmlFor="search-name">
        <input
          id="search-name"
          type="radio"
          data-testid="name-search-radio"
          name="filterRadio"
          value="name"
          onChange={ handleGenericInput }
        />
        Nome
      </label>
      <label htmlFor="search-firstLetter">
        <input
          id="search-firstLetter"
          type="radio"
          data-testid="first-letter-search-radio"
          name="filterRadio"
          value="firstLetter"
          onChange={ handleGenericInput }
        />
        Primeira Letra
      </label>
    </div>
  );
}
