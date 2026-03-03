import { useState } from 'react';
import './InputForm.css';

export default function InputForm({ onSimulate }) {
  const [data, setData] = useState({
    initial: 1000,
    monthly: 100,
    wantIncrease: false,
    stepYears: 1,
    raise: 50,
    maxAmount: 1200,
    annualRatePct: 9,
    inflationPct: 2.5,
    totalYears: 25
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseFloat(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Initial investment:
        <input type="number" name="initial" value={data.initial} onChange={handleChange} />
      </label>

      <label>
        Monthly investment:
        <input type="number" name="monthly" value={data.monthly} onChange={handleChange} />
      </label>

      Increase monthly investments each X years?
      <label className="checkbox-container">
        <input
          type="checkbox"
          name="wantIncrease"
          checked={data.wantIncrease}
          onChange={handleChange}
        />
      </label>

      {data.wantIncrease && <>
        <label>
          Years between raises:
          <input type="number" name="stepYears" value={data.stepYears} onChange={handleChange} />
        </label>
        <label>
          Raise amount:
          <input type="number" name="raise" value={data.raise} onChange={handleChange} />
        </label>
        <label>
          Max monthly investment:
          <input type="number" name="maxAmount" value={data.maxAmount} onChange={handleChange} />
        </label>
      </>}

      <label>
        Annual profit %:
        <input type="number" name="annualRatePct" value={data.annualRatePct} onChange={handleChange} />
      </label>

      <label>
        Annual inflation %:
        <input type="number" name="inflationPct" value={data.inflationPct} onChange={handleChange} />
      </label>

      <label>
        Total years:
        <input type="number" name="totalYears" value={data.totalYears} onChange={handleChange} />
      </label>

      <button type="submit">Simulate</button>
    </form>
  );
}