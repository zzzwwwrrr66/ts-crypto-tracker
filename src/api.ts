import axios from "axios";

export const getCoins = () => {
  return axios.get('https://api.coinpaprika.com/v1/coins').then(res=>res.data);
}
export const getCoinsDetail = async (id:any) => {
  const response = await axios.get(`https://api.coinpaprika.com/v1/coins/${id}`);
  return response.data;
}
export const getPrice = async (id:any) => {
  const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`);
  return response.data;
}

