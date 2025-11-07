"use client";

import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TOTAL = 150000; // INR

const sectors = [
  { key: "financials", name: "Financials", pct: 20, color: "#2563eb" },
  { key: "technology", name: "Information Technology", pct: 15, color: "#9333ea" },
  { key: "pharma", name: "Healthcare / Pharma", pct: 10, color: "#16a34a" },
  { key: "energy", name: "Energy", pct: 10, color: "#f59e0b" },
  { key: "fmcg", name: "Consumer Staples (FMCG)", pct: 10, color: "#ef4444" },
  { key: "industrials", name: "Industrials / Capital Goods", pct: 10, color: "#0ea5e9" },
  { key: "auto", name: "Auto / Discretionary", pct: 8, color: "#10b981" },
  { key: "metals", name: "Metals / Materials", pct: 7, color: "#a855f7" },
  { key: "utilities", name: "Utilities", pct: 5, color: "#22c55e" },
  { key: "realestate", name: "Real Estate / REITs", pct: 5, color: "#f97316" }
];

function formatINR(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export default function Page() {
  const amounts = useMemo(() => {
    return sectors.map(s => ({ ...s, amount: Math.round((s.pct / 100) * TOTAL) }));
  }, []);

  const data = useMemo(() => ({
    labels: amounts.map(a => `${a.name} (${a.pct}%)`),
    datasets: [
      {
        data: amounts.map(a => a.amount),
        backgroundColor: amounts.map(a => a.color),
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  }), [amounts]);

  const options = useMemo(() => ({
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${formatINR(ctx.parsed)}`
        }
      }
    },
    cutout: '55%'
  }), []);

  return (
    <main>
      <h1 style={{ fontSize: 28, margin: 0 }}>Suggested Allocation: INR 1,50,000</h1>
      <p style={{ marginTop: 8, color: '#475569' }}>Diversified sector split for long-term, risk-aware growth. Not investment advice.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center', marginTop: 20 }}>
        <div style={{ background: '#ffffff', borderRadius: 12, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Doughnut data={data} options={options} />
        </div>

        <div style={{ background: '#ffffff', borderRadius: 12, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: 10 }}>Breakdown</h3>
          <div>
            {amounts.map((a) => (
              <div key={a.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ width: 12, height: 12, borderRadius: 2, background: a.color }} />
                  <span>{a.name}</span>
                </div>
                <div style={{ fontWeight: 600 }}>{formatINR(a.amount)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontWeight: 700 }}>
            <span>Total</span>
            <span>{formatINR(TOTAL)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <section style={{ background: '#ffffff', borderRadius: 12, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0 }}>Suggested ETFs (India)</h3>
          <ul style={{ marginTop: 8, lineHeight: 1.6 }}>
            <li><strong>Core Broad Market</strong>: Motilal Oswal NASDAQ 100 ETF; Nippon India Nifty 50 BeES; HDFC NIFTY 50 ETF</li>
            <li><strong>Financials</strong>: Nippon India ETF Bank BeES; ICICI Prudential Nifty Bank ETF</li>
            <li><strong>Information Technology</strong>: ICICI Prudential Nifty IT ETF</li>
            <li><strong>Healthcare/Pharma</strong>: Nippon India Nifty Pharma ETF</li>
            <li><strong>Energy</strong>: ICICI Prudential Nifty Energy ETF</li>
            <li><strong>FMCG</strong>: ICICI Prudential FMCG ETF</li>
            <li><strong>Auto</strong>: Nippon India Nifty Auto ETF</li>
            <li><strong>Metals</strong>: Nippon India Nifty Metal ETF</li>
            <li><strong>Industrials/Infrastructure</strong>: ICICI Prudential Nifty Infrastructure ETF</li>
            <li><strong>Gold Diversifier</strong>: Nippon India ETF Gold BeES</li>
            <li><strong>Real Estate Income</strong>: Embassy REIT / Mindspace REIT (listed units)</li>
          </ul>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>Check expense ratios, tracking differences, and liquidity before investing.</p>
        </section>
        <section style={{ background: '#ffffff', borderRadius: 12, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0 }}>Crypto Picks (High Risk)</h3>
          <ul style={{ marginTop: 8, lineHeight: 1.6 }}>
            <li><strong>Bitcoin (BTC)</strong>: Long-term store-of-value narrative</li>
            <li><strong>Ethereum (ETH)</strong>: Smart contract platform with broad adoption</li>
            <li><strong>Solana (SOL)</strong>: High-throughput ecosystem; higher volatility</li>
          </ul>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>Limit crypto to a small satellite allocation; expect extreme volatility.</p>
        </section>
      </div>

      <section style={{ marginTop: 24, background: '#ffffff', borderRadius: 12, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>How to Use</h3>
        <ol style={{ lineHeight: 1.7 }}>
          <li>Use the sector split as a starting point; adjust to your risk.</li>
          <li>Prefer ETFs over single stocks for sector exposure.</li>
          <li>Rebalance annually or when drift exceeds 5% per sector.</li>
        </ol>
        <p style={{ color: '#64748b', fontSize: 13 }}>This is educational information, not financial advice. Do your own research.</p>
      </section>
    </main>
  );
}
