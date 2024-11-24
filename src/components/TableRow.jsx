import { useContext, useState } from "react";
import Button from "./button";
import { observer } from "mobx-react";
import { MobXProviderContext } from "mobx-react";

// Оборачиваем компонент в observer для реактивности MobX
const TableRow = observer(({ id, english, transcription, russian, tags }) => {
  // Получаем доступ к wordsStore через MobX Provider
  const { wordsStore } = useContext(MobXProviderContext);

  // Состояние для отслеживания режима редактирования
  const [isEditing, setIsEditing] = useState(false);

  // Состояние для хранения редактируемых данных
  const [editedData, setEditedData] = useState({
    english,
    transcription,
    russian,
    tags,
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({});

  // Обработчик для включения режима редактирования
  const handleEdit = () => {
    setIsEditing(true);
    setErrors({}); // Сбрасываем ошибки при начале редактирования
  };

  // Обработчик для отмены редактирования
  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ english, transcription, russian, tags }); // Возвращаем исходные данные
    setErrors({}); // Сбрасываем ошибки
  };

  // Обработчик для сохранения изменений
  const handleSave = () => {
    if (!hasEmptyFields) {
      wordsStore.updateWord(id, editedData); // Вызываем метод store для обновления слова
      setIsEditing(false);
    }
  };

  // Обработчик для удаления слова
  const handleDelete = () => {
    wordsStore.deleteWord(id); // Вызываем метод store для удаления слова
  };

  // Обработчик изменения полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Обновляем редактируемые данные
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Проверяем на пустое поле и обновляем ошибки
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  // Проверка наличия пустых полей
  const hasEmptyFields = Object.values(editedData).some(
    (value) => !value.trim()
  );

  // Функция для стилизации полей ввода в зависимости от наличия ошибок
  const inputStyle = (fieldName) => ({
    border: errors[fieldName] ? "2px solid red" : "1px solid #ccc",
  });

  return (
    <tr>
      <td>{id}</td>
      {isEditing ? (
        // Режим редактирования
        <>
          <td>
            <input
              name="english"
              value={editedData.english}
              onChange={handleChange}
              style={inputStyle("english")}
            />
          </td>
          <td>
            <input
              name="transcription"
              value={editedData.transcription}
              onChange={handleChange}
              style={inputStyle("transcription")}
            />
          </td>
          <td>
            <input
              name="russian"
              value={editedData.russian}
              onChange={handleChange}
              style={inputStyle("russian")}
            />
          </td>
          <td>
            <input
              name="tags"
              value={editedData.tags}
              onChange={handleChange}
              style={inputStyle("tags")}
            />
          </td>
          <td>
            <Button
              onClick={handleSave}
              text="Save"
              disabled={hasEmptyFields}
            />
            <Button onClick={handleCancel} text="Cancel" />
          </td>
        </>
      ) : (
        // Режим просмотра
        <>
          <td>{english}</td>
          <td>{transcription}</td>
          <td>{russian}</td>
          <td>{tags}</td>
          <td>
            <Button onClick={handleEdit} text="Edit" />
            <Button onClick={handleDelete} text="Delete" />
          </td>
        </>
      )}
    </tr>
  );
});
export default TableRow;
