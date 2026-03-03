export function simulateInvestment({
  initial = 1000,
  monthly = 100,
  wantIncrease = false,
  stepYears = 1,
  raise = 50,
  maxAmount = 1200,
  annualRatePct = 9,
  inflationPct = 2.5,
  totalYears = 25
}) {
  const monthlyRate = annualRatePct / 100 / 12;
  const monthlyInflation = inflationPct / 100 / 12;
  const totalMonths = Math.round(totalYears * 12);
  const stepMonths = wantIncrease ? stepYears * 12 : -1;

  let balance = initial;     // invested balance
  let saved = initial;       // total contributions
  let contribution = monthly;

  const timeline = [];

  for (let m = 0; m < totalMonths; m++) {
    // Add monthly contribution
    balance += contribution;
    saved += contribution;

    // Apply investment growth
    balance *= 1 + monthlyRate;

    // Inflation-adjusted invested balance
    const realBalance = balance / Math.pow(1 + monthlyInflation, m + 1);

    // Inflation-adjusted saved money
    const savedReal = saved / Math.pow(1 + monthlyInflation, m + 1);

    const year = Math.floor(m / 12) + 1;
    const month = (m % 12) + 1;

    timeline.push({
      year,
      month,
      balance: parseFloat(balance.toFixed(2)),
      realBalance: parseFloat(realBalance.toFixed(2)),
      saved: parseFloat(saved.toFixed(2)),
      savedReal: parseFloat(savedReal.toFixed(2))
    });

    // Optional contribution increases
    if (stepMonths !== -1 && (m + 1) % stepMonths === 0) {
      contribution += raise;
      if (contribution > maxAmount) contribution = maxAmount;
    }
  }

  // Final real balance for stats panel
  const finalRealBalance = balance / Math.pow(1 + monthlyInflation, totalMonths);
  const finalSavedReal = saved / Math.pow(1 + monthlyInflation, totalMonths);

  // Additional summary calculations
  const totalSaved = saved;
  const profit = balance - saved; // nominal profit
  const profitReal = finalRealBalance - finalSavedReal; // profit after inflation
  const compoundGains = profit;
  const inflationLoss = balance - finalRealBalance;
  const durationYears = totalMonths / 12;
  const cagr = Math.pow(balance / totalSaved, 1 / durationYears) - 1;

  return {
    timeline,
    totalSaved: parseFloat(totalSaved.toFixed(2)),
    finalBalance: parseFloat(balance.toFixed(2)),
    finalRealBalance: parseFloat(finalRealBalance.toFixed(2)),
    finalSavedReal: parseFloat(finalSavedReal.toFixed(2)),
    profit: parseFloat(profit.toFixed(2)),
    profitReal: parseFloat(profitReal.toFixed(2)),
    compoundGains: parseFloat(compoundGains.toFixed(2)),
    inflationLoss: parseFloat(inflationLoss.toFixed(2)),
    durationYears: parseFloat(durationYears.toFixed(2)),
    cagr: parseFloat(cagr.toFixed(4))
  };
}