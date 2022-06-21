const BASE_URL = "https://api.coinpaprika.com/v1";
const COINS_URL = `${BASE_URL}/coins`;

export const getCoins = () => fetch(COINS_URL).then((res) => res.json());
