import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { formatNumber } from '../utils';
import './InvestmentChart.css';

export default function InvestmentChart({ data }) {
  const [hiddenLines, setHiddenLines] = useState({});

  // Consolidăm datele anual
  const yearlyData = [];
  data.forEach(({ year, balance, realBalance, saved, savedReal }) => {
    const existing = yearlyData.find(d => d.year === year);
    if (existing) {
      existing.balance = balance;
      existing.realBalance = realBalance;
      existing.saved = saved;
      existing.savedReal = savedReal;
    } else {
      yearlyData.push({ year, balance, realBalance, saved, savedReal });
    }
  });

  const lines = [
    { dataKey: 'balance', color: '#50e3c2', name: 'Investments Value' },
    { dataKey: 'realBalance', color: '#4a90e2', name: 'Investments Value (After Inflation)' },
    { dataKey: 'saved', color: '#f5a623', name: 'Total Contributions' },
    { dataKey: 'savedReal', color: '#d0021b', name: 'Total Contributions (After Inflation)' },
  ];

  const handleLegendClick = (o) => {
    const { dataKey } = o;
    setHiddenLines(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={yearlyData}
        margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip formatter={(value) => formatNumber(value)} />
        <Legend onClick={handleLegendClick} />
        {lines.map(line => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            name={line.name}
            hide={hiddenLines[line.dataKey]}
            dot={true}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}