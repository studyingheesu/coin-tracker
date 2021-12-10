const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const fetchInfo = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
};

export const fetchPrice = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
};

const MILLISECOND_TO_SECOND = 1000;
const SECOND_TO_WEEK = 60 * 60 * 24 * 7;
export const fetchCoinHistory = (coinId: string) => {
  const nowInSecond = Math.floor(Date.now() / MILLISECOND_TO_SECOND);
  const twoWeekAgoInSecond = Math.floor(
    (Date.now() - MILLISECOND_TO_SECOND * SECOND_TO_WEEK * 2) / MILLISECOND_TO_SECOND
  );

  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${twoWeekAgoInSecond}&end=${nowInSecond}`).then(
    (response) => response.json()
  );
};
