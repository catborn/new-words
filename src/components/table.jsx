import TableRow from "./TableRow";
import data from "./data";
import styles from "./Table.module.css";
import React, { useContext } from "react";
import { WordsContext } from "./WordsContext";

function Table() {
  const { data, loading, error } = useContext(WordsContext);

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
        {data.map((data) => (
          <TableRow key={data.id} {...data} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
