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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ english, transcription, russian, tags });
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
  };

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
            />
          </td>
          <td>
            <input
              name="transcription"
              value={editedData.transcription}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="russian"
              value={editedData.russian}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="tags"
              value={editedData.tags}
              onChange={handleChange}
            />
          </td>
          <td>
            <Button onClick={handleSave} text="Save" />
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
