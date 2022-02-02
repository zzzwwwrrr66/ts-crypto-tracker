import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`

export const getCoins = () => {
  return axios.get(`${BASE_URL}/coins`).then(res=>res.data);
}
export const getCoinsDetail = async (id:any) => {
  const response = await axios.get(`${BASE_URL}/coins/${id}`);
  return response.data;
}
export const getPrice = async (id:any) => {
  const response = await axios.get(`${BASE_URL}/tickers/${id}`);
  return response.data;
}
export const getChart = async (id:any) => {
  // startDate 14일 //endDate 현재
  const endDate = Math.ceil(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  const response = await axios.get(`${BASE_URL}/coins/${id}/ohlcv/historical?start=${startDate}&end=${endDate}`);
  return response.data;
}

