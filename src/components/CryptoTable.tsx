import { useAppSelector } from '../redux/hooks';

export const CryptoTable = () => {
  const { coins, status } = useAppSelector((state) => state.crypto);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <table className="min-w-full border border-gray-300 border-collapse">
    <thead className="bg-white-800 text-white">
      <tr>
        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Change</th>
      </tr>
    </thead>
    <tbody className="bg-white">
      {coins.map((coin) => (
        <tr key={coin.id} className="hover:bg-blue-100 transition-colors">
          <td className="border border-blue-300 px-4 py-2 text-black">{coin.name}</td>
          <td className="border border-blue-300 px-4 py-2 text-black">${coin.current_price.toFixed(2)}</td>
          <td
            className={`border border-gray-300 px-4 py-2 ${
              coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  

  );
};
