import React from "react";
import TableRow from "./TableRow";
// import data from "./data";
import styles from "./Table.module.css";
import { observer } from "mobx-react";
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

const Table = observer(() => {
  const { wordsStore } = useContext(MobXProviderContext);

  // useEffect(() => {
  //   wordsStore.fetchWords();
  // }, [wordsStore]);

  if (wordsStore.loading) {
    return <div>Loading...</div>;
  }

  if (wordsStore.error) {
    return <div>Error: {wordsStore.error}</div>;
  }

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
        {wordsStore.words.map((word) => (
          <TableRow key={word.id} {...word} />
        ))}
      </tbody>
    </table>
  );
});
export default Table;
