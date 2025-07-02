import  { useState } from 'react';
import { useStockSocket } from '../sockets/useStocksocket';

const initialHoldings = [
  { symbol: 'AAPL', shares: 10, costBasis: 150 },
  { symbol: 'MSFT', shares: 5, costBasis: 280 },
  { symbol: 'TSLA', shares: 8, costBasis: 700 },
  { symbol: 'AMZN', shares: 4, costBasis: 3200 },
  { symbol: 'GOOGL', shares: 6, costBasis: 2500 },
  { symbol: 'NVDA', shares: 7, costBasis: 600 },
  { symbol: 'META', shares: 9, costBasis: 300 },
  { symbol: 'NFLX', shares: 3, costBasis: 500 },
  { symbol: 'INTC', shares: 10, costBasis: 45 },
  { symbol: 'IBM', shares: 5, costBasis: 130 }
];

const StockTable = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [previous, setPrevious] = useState<Record<string, number>>({});

  useStockSocket(
    initialHoldings.map((h) => h.symbol),
    (symbol, price) => {
      setPrevious((prev) => ({ ...prev, [symbol]: prices[symbol] || price }));
      setPrices((prev) => ({ ...prev, [symbol]: price }));
    }
  );

  return (
    <table className="min-w-full border border-gray-300 border-collapse">
      <thead className="sticky top-0  shadow z-10">
        <tr className="text-sm text-black-500 border-b"></tr>
        <tr className="text-sm text-gray-500 bg-gray-100 rounded">
   
          <th className="border border-gray-300 px-4 py-2 text-left">  📊 Symbol</th>
          <th className="border border-gray-300 px-4 py-2 text-left">🧮 Shares</th>
          <th className="border border-gray-300 px-4 py-2 text-left">💵 Cost Basis</th>
          <th className="border border-gray-300 px-4 py-2 text-left">💰 Market Price</th>
          <th className="border border-gray-300 px-4 py-2 text-left">💼 Market Value</th>
          <th className="border border-gray-300 px-4 py-2 text-left">📈📉 Gain / Loss</th>
        </tr>
      </thead>
      <tbody>
        {initialHoldings.map(({ symbol, shares, costBasis }) => {
          const price = prices[symbol] || costBasis;
          const oldPrice = previous[symbol] || costBasis;
          const marketValue = price * shares;
          const costValue = costBasis * shares;
          const gainLoss = marketValue - costValue;
          const gainPercent = ((gainLoss / costValue) * 100).toFixed(2);

          const direction = price > oldPrice ? 'up' : price < oldPrice ? 'down' : '';
          const bgColor =
            direction === 'up'
              ? 'bg-green-100 text-green-700'
              : direction === 'down'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-50';

          return (
            <tr className="hover:bg-blue-100 transition" key={symbol}>
              <td className="flex items-center space-x-2 font-semibold text-gray-700">
  <span>📈</span>
  <span>{symbol}</span>
</td>
              <td>{shares}</td>
              <td>${costBasis.toFixed(2)}</td>
              <td className={`rounded p-2 transition-colors duration-300 ${bgColor}`}>
                ${price.toFixed(2)}
              </td>
              {/* <td>${marketValue.toFixed(2)}</td> */}
              <td
  className={`p-2 rounded transition-colors duration-300 ${
    marketValue > prices[symbol] ? 'bg-green-100' :
    marketValue < prices[symbol] ? 'bg-red-100' :
    'bg-white'
  }`}
>
  <span
    className={`block font-medium ${
      marketValue !== prices[symbol] ? 'animate-pulse' : ''
    }`}
  >
    ${marketValue.toFixed(2)}
  </span>
</td>
              {/* <td className={`${bgColor} rounded p-2`}>
                ${gainLoss.toFixed(2)} ({gainPercent}%)
              </td> */}
       <td>
  {gainLoss > 0 ? '📈' : gainLoss < 0 ? '📉' : '⏸️'} 
  ${gainLoss.toFixed(2)} ({gainPercent}%)
</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StockTable;
