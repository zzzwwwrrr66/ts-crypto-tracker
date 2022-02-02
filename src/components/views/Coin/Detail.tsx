import { useEffect, useState } from 'react';
import { Route, Switch, useParams, Link, useRouteMatch } from 'react-router-dom';
import axios from "axios";
import {useQuery} from 'react-query';
import { getCoinsDetail, getPrice,getCoins } from '../../../api'

import {ITicker, IDetail} from './Types';

import "./style.css";

import DetailPrice from './DetailPrice';
import DetailChart from './DetailChart';
import { Helmet } from 'react-helmet';


const CoinDetail = () => {
  const params = useParams<{id: string}>();
  const [loading, setLoading] = useState(false);
  const [coinInfo, setCoinInfo] = useState<IDetail>()
  const [priceInfo, setPriceInfo] = useState<ITicker>();
  const isPrice = useRouteMatch(`/${params.id}/price`);
  const isChart = useRouteMatch(`/${params.id}/chart`);

  const { isLoading : loadingDetail , data: dataDetail} = useQuery<IDetail>(
    ['detail', params.id], 
    () => getCoinsDetail(params.id)
  );
  const { isLoading : loadingPrice , data: dataPrice} = useQuery<ITicker>(
    ['price', params.id], 
    () => getPrice(params.id),
    {
      refetchInterval: 5000,
    }
  );
  const isLoading = loadingDetail && loadingPrice;
  // useEffect(()=>{
  //   setLoading(true);
  //   const coins = axios.get(`https://api.coinpaprika.com/v1/coins/${params.id}`);
  //   const tickers = axios.get(`https://api.coinpaprika.com/v1/tickers/${params.id}`);
  //   axios.all([coins, tickers])
  //   .then(
  //     axios.spread((...responses) => {
  //       const responseCoins = responses[0].data;
  //       const responseTickers = responses[1].data;
  //       setPriceInfo(responseTickers);
  //       setCoinInfo(responseCoins);
  //       setLoading(false);
  //     })
  //   )
  // },[])

  return(
    <>
    <Helmet>
      <title>{params.id}</title>
    </Helmet>
      <h1>Coin : {params.id} </h1>
      <Link to='/'>Home</Link>
      {
        isLoading ? (
          <p>loading...</p>
        ) : (
          <div>
            <p>{dataDetail?.name}</p>
            
            <div className='infoContainer'>
              <p>RANK: {dataDetail?.rank}</p>
              <p>symbol: {dataDetail?.symbol}</p>
              <span>Price:</span>
              <span>${dataPrice?.quotes.USD.price.toFixed(3)}</span>
            </div>
            <p>{dataDetail?.description}</p>
            <div className='infoContainer'>
              <p>total supply: {dataPrice?.total_supply}</p>
              <p>max supply: {dataPrice?.max_supply}</p>
            </div>
            <div className={`tabWrap`}>
              <Link to={`/ts-crypto-tracker/${params.id}/chart`} className={isChart ? 'active' : ''}>chart page</Link>
              <Link to={`/ts-crypto-tracker/${params.id}/price`} className={isPrice ? 'active' : ''}>price page</Link>
            </div>
            <Switch>
              <Route path={`/ts-crypto-tracker/${params.id}/chart`}>
                <DetailChart coinId={params.id}/>
              </Route>
              <Route path={`/ts-crypto-tracker/${params.id}/price`} >
                <DetailPrice/>
              </Route>
            </Switch>
          </div>
        )
      }
    </>
  )
}

export default CoinDetail;