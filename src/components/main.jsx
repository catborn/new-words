import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";
import { data } from "./data.js";

function Main() {
  const [isSelected, setIsSelected] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Добавляем состояние для подсчета изученных слов
  const [learnedWords, setLearnedWords] = useState(0);
  // Добавляем ref для кнопки
  const cardRef = useRef(null);
  // Добавляем useEffect для автофокуса
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [currentWordIndex]); // Перефокусировка при смене слова

  const handleClick = () => {
    if (!isSelected) {
      // Увеличиваем счетчик только когда показываем перевод впервые
      setLearnedWords((prev) => prev + 1);
    }
    setIsSelected(!isSelected);
  };

  const currentWord = data[currentWordIndex];

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % data.length);
    setIsSelected(false);
  };

  const previosWord = () => {
    setCurrentWordIndex((previosIndex) =>
      previosIndex === 0 ? data.length - 1 : previosIndex - 1
    );
    setIsSelected(false);
  };

  return (
    <div>
      {/* Добавляем счетчик изученных слов */}
      <div className={styles.counter}>Изучено слов: {learnedWords}</div>

      <div
        className={styles.Cards}
        onClick={handleClick}
        ref={cardRef} // Добавляем ref
        tabIndex="0" // Делаем элемент фокусируемым
        role="button"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      >
        {isSelected ? (
          <div className={styles.selected}>{currentWord.russian}</div>
        ) : (
          currentWord.english
        )}
      </div>

      <div>
        <button className="Button" onClick={previosWord}>
          Previos Word
        </button>
        <button className="Button" onClick={nextWord}>
          Next Word
        </button>
      </div>
    </div>
  );
}

export default Main;
