import { formatNumber } from '../utils';
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
          <th>Balance if only Saved (After Inflation)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.year}</td>
            <td>{row.month}</td>
            <td>{formatNumber(row.balance)}</td>
            <td>{formatNumber(row.realBalance)}</td>
            <td>{formatNumber(row.saved)}</td>
            <td>{formatNumber(row.savedReal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}