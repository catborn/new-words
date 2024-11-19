import React, { useState, useRef, useEffect } from "react";//импортируем хуки: управление состоянием компонента, объект-реф сохранящий состояния м/у рендерами, для фокуса
import styles from "./Card.module.css";
import { data } from "./data.js";

function Main() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);//индекс текущего слова
  const [learnedWords, setLearnedWords] = useState(0);//количнство изученных слов
  const [showTranslation, setShowTranslation] = useState(false);//флаг вкл/выкл перевода слова
  const cardRef = useRef(null);//фокусировка на элементе

  useEffect(() => {
    if (cardRef.current) {//если элемент связан с cardRef
      cardRef.current.focus();//то устанавливаем фокус на карточку
    }
  }, [currentWordIndex]);//вызывается каждый раз, когда меняется currentWordIndex

  const currentWord = data[currentWordIndex];//хранит текущее слова из массива data
//обработчики событий
  const handleShowTranslation = () => {
    if (!showTranslation) {//если перевод не показан
      setLearnedWords((prev) => prev + 1);//увеличить счетчик изученных слов
    }
    setShowTranslation(true);//показать перевод
  };
//кнопка Next Word
  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % data.length);//если конец,то начать цикл сначала
    setShowTranslation(false);//скрыть текущий перевод
  };
//кнопка Previos Word
  const previosWord = () => {
    setCurrentWordIndex((previosIndex) =>
      previosIndex === 0 ? data.length - 1 : previosIndex - 1//если индекс=0, перейти к посленему слову в списке
    );
    setShowTranslation(false);
  };
//рендеринг
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
