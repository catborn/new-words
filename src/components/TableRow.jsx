import { useState } from "react";
import Button from "./button";

const TableRow = ({ id, english, transcription, russian, tags }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    english,
    transcription,
    russian,
    tags,
  });
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ english, transcription, russian, tags });
    setErrors({});
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Проверка на пустое поле
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  // Проверка наличия пустых полей
  const hasEmptyFields = Object.values(editedData).some(
    (value) => !value.trim()
  );

  const inputStyle = (fieldName) => ({
    border: errors[fieldName] ? "2px solid red" : "1px solid #ccc",
  });

  return (
    <tr>
      <td>{id}</td>
      {isEditing ? (
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
        <>
          <td>{english}</td>
          <td>{transcription}</td>
          <td>{russian}</td>
          <td>{tags}</td>
          <td>
            <Button onClick={handleEdit} text="Edit" />
            <Button text="Delete" />
          </td>
        </>
      )}
    </tr>
  );
};
export default TableRow;
