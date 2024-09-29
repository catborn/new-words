import TableRow from "./TableRow";
import data from "./data";

function Table() {
  return (
    <table>
      <thead>
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
