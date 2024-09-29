import Button from "./button";

const TableRow = ({ id, english, transcription, russian, tags }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{english}</td>
      <td>{transcription}</td>
      <td>{russian}</td>
      <td>{tags}</td>
      <td>
        <Button />
        <Button />
      </td>
    </tr>
  );
};

export default TableRow;
