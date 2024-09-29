import TableRow from "./TableRow";
import data from "./data";
import styles from "./Table.module.css";

function Table() {
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
