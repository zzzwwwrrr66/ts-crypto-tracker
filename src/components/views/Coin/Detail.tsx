import { useEffect, useState } from 'react';
import { Route, Switch, useParams, Link, useRouteMatch } from 'react-router-dom';
import axios from "axios";
import {useQuery} from 'react-query';
import { getCoinsDetail, getPrice,getCoins } from '../../../api'

import {ITicker, IDetail} from './Types';

import "./style.css";

import DetailPrice from './DetailPrice';
import DetailChart from './DetailChart';


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
  const { isLoading : loadingPrice , data: dataDPrice} = useQuery<ITicker>(
    ['price', params.id], 
    () => getPrice(params.id)
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
      <h1>Coin : {params.id} </h1>
      {
        isLoading ? (
          <p>loading...</p>
        ) : (
          <div>
            <p>{dataDetail?.name}</p>
            
            <div className='infoContainer'>
              <p>RANK: {dataDetail?.rank}</p>
              <p>symbol: {dataDetail?.symbol}</p>
              <p>open_source: {dataDetail?.open_source ? (<div>true</div>) : (<div>false</div>)}</p>
            </div>
            <p>{dataDetail?.description}</p>
            <div className='infoContainer'>
              <p>total supply: {dataDPrice?.total_supply}</p>
              <p>max supply: {dataDPrice?.max_supply}</p>
            </div>
            <div className={`tabWrap`}>
              <Link to={`/${params.id}/price`} className={isPrice ? 'active' : ''}>price page</Link>
              <Link to={`/${params.id}/chart`} className={isChart ? 'active' : ''}>chart page</Link>
            </div>
            <Switch>
              <Route path={`/${params.id}/price`} >
                <DetailPrice/>
              </Route>
              <Route path={`/${params.id}/chart`}>
                <DetailChart/>
              </Route>
            </Switch>
          </div>
        )
      }
    </>
  )
}

export default CoinDetail;