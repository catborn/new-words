import React from "react";
import { useState } from "react";
import styles from "./Card.module.css";

function Main() {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <header>
      <h3>
        <h1>Main</h1>
      </h3>
      <div className={styles.Cards} onClick={handleClick}>
        {isSelected ? (
          <div className={styles.selected}>Перевод слова</div>
        ) : (
          "Иностранное слово"
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
