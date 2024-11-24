import React, { useState } from "react";
import { observer } from "mobx-react";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import styles from "./Form.module.css";

const WordForm = observer(() => {
  const { wordsStore } = useContext(MobXProviderContext);
  const [word, setWord] = useState({
    english: "",
    transcription: "",
    russian: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверяем, что все поля существуют и не пустые
    if (
      Object.entries(word).every(([key, value]) => value && value.trim() !== "")
    ) {
      wordsStore.addWord(word);
      setWord({ english: "", transcription: "", russian: "", tags: "" });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form className={styles.input} onSubmit={handleSubmit}>
      <input
        name="english"
        value={word.english || ""}
        onChange={handleChange}
        placeholder="English"
      />
      <input
        name="transcription"
        value={word.transcription || ""}
        onChange={handleChange}
        placeholder="Transcription"
      />
      <input
        name="russian"
        value={word.russian || ""}
        onChange={handleChange}
        placeholder="Russian"
      />
      <input
        name="tags"
        value={word.tags || ""}
        onChange={handleChange}
        placeholder="Tags"
      />
      <button type="submit">Add word</button>
    </form>
  );
});
export default WordForm;
