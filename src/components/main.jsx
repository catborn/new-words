import React, { useState, useRef, useEffect, useContext } from "react"; //импортируем хуки: управление состоянием компонента, объект-реф сохранящий состояния м/у рендерами, для фокуса
import { observer } from "mobx-react";
import { MobXProviderContext } from "mobx-react";
import styles from "./Card.module.css";
// import { data } from "./data.js";

// Оборачиваем компонент в observer для реактивности MobX
const Main = observer(() => {
  // Получаем доступ к wordsStore через MobX Provider
  const { wordsStore } = useContext(MobXProviderContext);

  // Состояние для индекса текущего слова
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Состояние для количества изученных слов
  const [learnedWords, setLearnedWords] = useState(0);
  // Флаг для отображения/скрытия перевода
  const [showTranslation, setShowTranslation] = useState(false);
  // Ref для фокусировки на карточке
  const cardRef = useRef(null);

  // Эффект для фокусировки на карточке при изменении слова
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [currentWordIndex]);

  // Получаем текущее слово из store
  const currentWord = wordsStore.words[currentWordIndex] || {};

  // Обработчик для показа перевода
  const handleShowTranslation = () => {
    if (!showTranslation) {
      setLearnedWords((prev) => prev + 1);
    }
    setShowTranslation(true);
  };

  // Обработчик для перехода к следующему слову
  const nextWord = () => {
    setCurrentWordIndex(
      (prevIndex) => (prevIndex + 1) % wordsStore.words.length
    );
    setShowTranslation(false);
  };

  // Обработчик для перехода к предыдущему слову
  const previosWord = () => {
    setCurrentWordIndex((previosIndex) =>
      previosIndex === 0 ? wordsStore.words.length - 1 : previosIndex - 1
    );
    setShowTranslation(false);
  };

  // Если данные загружаются, показываем сообщение о загрузке
  if (wordsStore.loading) {
    return <div>Loading...</div>;
  }

  // Если произошла ошибка, показываем сообщение об ошибке
  if (wordsStore.error) {
    return <div>Error: {wordsStore.error}</div>;
  }

  // Если слов нет, показываем соответствующее сообщение
  if (wordsStore.words.length === 0) {
    return <div>No words available</div>;
  }

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
});
export default Main;
