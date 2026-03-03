import './InvestmentTable.css';

export default function InvestmentTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Month</th>
          <th>Balance if invested</th>
          <th>Balance if invested (After Inflation)</th>
          <th>Money Saved Up</th>
          <th>Balance if only Saved (After inflation)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.year}</td>
            <td>{row.month}</td>
            <td>{row.balance}</td>
            <td>{row.realBalance}</td>
            <td>{row.saved}</td>
            <td>{row.savedReal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}