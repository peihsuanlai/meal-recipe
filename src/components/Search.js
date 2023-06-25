import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  const [text, setText] = useState("");

  //input改變
  const handleChange = (e) => {
    setText(e.target.value);
  };

  //按下enter
  const handleKeyDown = (e) => {
    if (text && e.key === "Enter") {
      setSearchTerm(text);
    }
  };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };

  return (
    <header className="search-container">
      <div className="input-wrapper">
        <label htmlFor="search" className="iconContainer">
          <AiOutlineSearch className="searchIcon" />
        </label>
        <input
          type="text"
          placeholder="Type what you want for recipe"
          id="search"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
      </div>
      <div className="surprise">
        <i>Pick a random meal {">>>"} </i>
        <button
          type="button"
          className="btn surprise-btn"
          onClick={handleRandomMeal}
        >
          Surprise!
        </button>
      </div>
    </header>
  );
};

export default Search;
