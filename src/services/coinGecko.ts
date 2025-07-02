
import axios from 'axios';

export const fetchTopCryptos = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets';
  const params = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 5,
    page: 1,
    sparkline: false
  };

  const response = await axios.get(url, { params });
  return response.data;
};

export const fetchCryptoPrices = async (symbols: string[]) => {
  const query = symbols.join(',');
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${query}&vs_currencies=usd`
  );
  const data = await res.json();
  return symbols.map((key) => ({ name: key.toUpperCase(), price: data[key]?.usd }));
};

