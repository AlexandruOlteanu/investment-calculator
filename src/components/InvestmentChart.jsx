import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './InvestmentChart.css';

export default function InvestmentChart({ data }) {
  const yearlyData = [];

  data.forEach(({ year, balance, realBalance, saved, savedReal }) => {
    const existing = yearlyData.find(d => d.year === year);
    if (existing) {
      existing.balance = balance;
      existing.realBalance = realBalance;
      existing.saved = saved;
      existing.savedReal = savedReal;
    } else {
      yearlyData.push({
        year,
        balance,
        realBalance,
        saved,
        savedReal
      });
    }
  });

  return (
    <ResponsiveContainer width="100%" height={500}>
  <LineChart
    data={yearlyData}
    margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
  >
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="balance" stroke="#50e3c2" name="Investments Value" />
    <Line type="monotone" dataKey="realBalance" stroke="#4a90e2" name="Investments Value (After Inflation)" />
    <Line type="monotone" dataKey="saved" stroke="#f5a623" name="Total Contributions" />
    <Line type="monotone" dataKey="savedReal" stroke="#d0021b" name="Total Contributions (After inflation)" />
  </LineChart>
</ResponsiveContainer>
  );
}