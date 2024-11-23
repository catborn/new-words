import TableRow from "./TableRow";
// import data from "./data";
import styles from "./Table.module.css";
import React, { useContext } from "react";
import { WordsContext } from "./WordsContext";

function Table() {
  const { words, loading, error } = useContext(WordsContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <table className={styles.table_container}>
      <thead className={styles.table}>
        <tr>
          <th>#</th>
          <th>word</th>
          <th>transcription</th>
          <th>translation</th>
          <th>tag</th>
        </tr>
      </thead>
      <tbody>
        {words.map((words) => (
          <TableRow key={words.id} {...words} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
