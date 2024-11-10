import React, { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";
import { data } from "./data.js";

function Main() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [currentWordIndex]);

  const currentWord = data[currentWordIndex];

  const handleShowTranslation = () => {
    if (!showTranslation) {
      setLearnedWords((prev) => prev + 1);
    }
    setShowTranslation(true);
  };

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % data.length);
    setShowTranslation(false);
  };

  const previosWord = () => {
    setCurrentWordIndex((previosIndex) =>
      previosIndex === 0 ? data.length - 1 : previosIndex - 1
    );
    setShowTranslation(false);
  };

  return (
    <div>
      <div className={styles.counter}>Изучено слов: {learnedWords}</div>

      <div
        className={styles.Cards}
        ref={cardRef}
        tabIndex="0"
        role="button"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleShowTranslation();
          }
        }}
      >
        <div>{currentWord.english}</div>
        {showTranslation ? (
          <div className={styles.selected}>{currentWord.russian}</div>
        ) : (
          <button className="Button" onClick={handleShowTranslation}>
            Показать перевод
          </button>
        )}
      </div>

      <div>
        <button className="Button" onClick={previosWord}>
          Previous Word
        </button>
        <button className="Button" onClick={nextWord}>
          Next Word
        </button>
      </div>
    </div>
  );
}
export default Main;
