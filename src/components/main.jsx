import React from "react";
import { useState } from "react";
import styles from "./Card.module.css";
import { data } from "./data.js";

function Main() {
  const [isSelected, setIsSelected] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const currentWord = data[currentWordIndex];

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % data.length);
    setIsSelected(false);
  };

  const previosWord = () => {
    setCurrentWordIndex((previosIndex) => (previosIndex - 1) % data.length);
    setIsSelected(false);
  };

  return (
    <div>
      {/* <h3>
        <h1>Game</h1>
      </h3> */}
      <div className={styles.Cards} onClick={handleClick}>
        {isSelected ? (
          <div className={styles.selected}>{currentWord.russian}</div>
        ) : (
          currentWord.english
        )}
      </div>
      {/* <div className="Cards">Card</div>
      <div className="Cards">Card</div>
      <div className="Cards">Card</div> */}
      <div>
        <button className="Button" onClick={previosWord}>
          Previos Word
        </button>
        <button className="Button" onClick={nextWord}>
          Next Word
        </button>
        {/* <button className="Button">button</button> */}
      </div>
    </div>
  );
}

export default Main;
