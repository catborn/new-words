import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./Card.module.css";
import { WordsContext } from "./WordsContext";

function Main() {
  const { words, loading, error } = useContext(WordsContext); // Получаем данные из контекста
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [currentWordIndex]);

  // Показываем загрузку
  if (loading) {
    return <div>Loading...</div>;
  }

  // Показываем ошибку
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Проверяем наличие слов
  if (!words || words.length === 0) {
    return <div>No words available</div>;
  }

  const currentWord = words[currentWordIndex];

  const handleShowTranslation = () => {
    if (!showTranslation) {
      setLearnedWords((prev) => prev + 1);
    }
    setShowTranslation(true);
  };

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    setShowTranslation(false);
  };

  const previosWord = () => {
    setCurrentWordIndex((previosIndex) =>
      previosIndex === 0 ? words.length - 1 : previosIndex - 1
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
        <button
          className="Button"
          onClick={previosWord}
          disabled={words.length <= 1}
        >
          Previous Word
        </button>
        <button
          className="Button"
          onClick={nextWord}
          disabled={words.length <= 1}
        >
          Next Word
        </button>
      </div>
    </div>
  );
}
export default Main;
