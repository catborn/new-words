import React from "react";
import { useState } from "react";
import styles from "./Card.module.css";
import { data } from "./data.js";

function Main() {
  const [isSelected, setIsSelected] = useState(false);
  const [currentWordIndex] = useState(0);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const currentWord = data[currentWordIndex];

  return (
    <header>
      <h3>
        <h1>Main</h1>
      </h3>
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
        <button className="Button">button</button>
        <button className="Button">button</button>
        <button className="Button">button</button>
      </div>
    </header>
  );
}

export default Main;
