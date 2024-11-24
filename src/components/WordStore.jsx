import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import { observer, Provider } from "mobx-react";

class WordsStore {
  words = [];
  loading = true;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchWords = async () => {
    try {
      this.loading = true;
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      const data = await response.json();
      runInAction(() => {
        this.words = data;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to fetch words";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  addWord = async (newWord) => {
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words",
        {
          method: "POST",
          body: JSON.stringify(newWord),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      runInAction(() => {
        this.words.push(data);
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to add word";
      });
    }
  };

  updateWord = async (id, updatedWord) => {
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}`,
        {
          method: "POST",
          body: JSON.stringify(updatedWord),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      runInAction(() => {
        const index = this.words.findIndex((word) => word.id === id);
        if (index !== -1) {
          this.words[index] = data;
        }
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to update word";
      });
    }
  };

  deleteWord = async (id) => {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
        method: "DELETE",
      });
      runInAction(() => {
        this.words = this.words.filter((word) => word.id !== id);
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Failed to delete word";
      });
    }
  };
}

const wordsStore = new WordsStore();

export const WordsProvider = observer(({ children }) => {
  React.useEffect(() => {
    wordsStore.fetchWords();
  }, []);

  return <Provider wordsStore={wordsStore}>{children}</Provider>;
});
