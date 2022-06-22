const BASE_URL = "https://api.coinpaprika.com/v1";
const COINS_URL = `${BASE_URL}/coins`;

export const getCoins = () => fetch(COINS_URL).then((res) => res.json());
export const getDetail = ({ queryKey }) =>
  fetch(`${BASE_URL}/tickers/${queryKey[1]}`).then((res) => res.json());
export const getHistory = ({ queryKey }) =>
  fetch(
    `${BASE_URL}/tickers/${queryKey[1]}/historical?start=${
      new Date().toISOString().split("T")[0]
    }&interval=1h`
  ).then((res) => res.json());
