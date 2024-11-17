import React, { createContext, useState, useEffect } from "react";

export const WordsContext = createContext();

export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных при монтировании компонента
  useEffect(() => {
    fetchWords();
  }, []);

  // Получение списка слов
  const fetchWords = async () => {
    try {
      setLoading(true);
      // http://sandbox.itgirlschool.ru/api/words
      const response = await fetch("http://sandbox.itgirlschool.ru/api/words");
      const data = await response.json();
      setWords(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch words");
    } finally {
      setLoading(false);
    }
  };

  // Добавление нового слова
  const addWord = async (newWord) => {
    try {
      // API-запрос на добавление
      const response = await fetch("http://sandbox.itgirlschool.ru/api/words", {
        method: "POST",
        body: JSON.stringify(newWord),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setWords((prevWords) => [...prevWords, data]);
    } catch (err) {
      setError("Failed to add word");
    }
  };

  // Обновление слова
  const updateWord = async (id, updatedWord) => {
    try {
      // API-запрос на обновление
      const response = await fetch(
        `http://sandbox.itgirlschool.ru/api/words/${id}`,
        {
          method: "POST",
          body: JSON.stringify(updatedWord),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setWords((prevWords) =>
        prevWords.map((word) => (word.id === id ? data : word))
      );
    } catch (err) {
      setError("Failed to update word");
    }
  };

  // Удаление слова
  const deleteWord = async (id) => {
    try {
      // API-запрос на удаление
      await fetch(`http://sandbox.itgirlschool.ru/api/words/${id}`, {
        method: "DELETE",
      });
      setWords((prevWords) => prevWords.filter((word) => word.id !== id));
    } catch (err) {
      setError("Failed to delete word");
    }
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        loading,
        error,
        addWord,
        updateWord,
        deleteWord,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};
