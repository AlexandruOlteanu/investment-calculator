import { useState } from 'react';
import InputForm from './components/InputForm';
import InvestmentChart from './components/InvestmentChart';
import InvestmentTable from './components/InvestmentTable';
import { simulateInvestment, formatNumber } from './utils';
import './App.css';

export default function App() {
  const [simulation, setSimulation] = useState(null);

  const handleSimulate = (inputs) => {
    const result = simulateInvestment(inputs);
    setSimulation(result);
  };

  return (
    <div className="container">
      <h1>Investment Simulator</h1>
      <InputForm onSimulate={handleSimulate} />
      {simulation && <>
        <h2>Yearly Evolution</h2>
        <InvestmentChart data={simulation.timeline} />
        <br /><br />
        <h2>Summary</h2>
        <p>Total contributions: {formatNumber(simulation.totalSaved)}</p>
        <p>Total contributions after inflation: {formatNumber(simulation.finalSavedReal)}</p>
        <p>Final balance: {formatNumber(simulation.finalBalance)}</p>
        <p>Real balance (inflation adjusted): {formatNumber(simulation.finalRealBalance)}</p>
        <p>Profit: {formatNumber(simulation.profit)}</p>
        <p>Profit (real): {formatNumber(simulation.profitReal)}</p>
        <p>Compound gains: {formatNumber(simulation.compoundGains)}</p>
        <p>CAGR: {(simulation.cagr * 100).toFixed(2)}%</p>
        <p>Inflation loss: {formatNumber(simulation.inflationLoss)}</p>
        <p>Duration: {simulation.durationYears} years</p>

        <h2>Timeline</h2>
        <InvestmentTable data={simulation.timeline} />
      </>}
    </div>
  );
}