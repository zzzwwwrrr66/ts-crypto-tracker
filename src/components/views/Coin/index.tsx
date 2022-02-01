import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {IDatas} from './Types';

import {useQuery} from 'react-query';
import { getCoins } from '../../../api'

const Coins = () => {
  // const [datas, setDatas] = useState<IDatas[]>();
  // const [loading, setLoading] = useState(false);

  const { isLoading, data} = useQuery<IDatas[]>('allCoins', getCoins);
  
  /* useEffect(()=>{
    console.log('query loading ',isLoading, 'query data', data, )
    setLoading(true);
    axios.get('https://api.coinpaprika.com/v1/coins')
    .then(res=>res.data)
    .then(data=>{
      setDatas(data.slice(0,99));
      setLoading(false);
    })
  },[]); */

  return(
    <>
      <h1>Coins</h1>
      <ul>
        {
          isLoading ? (
            <p>loading...</p>
          ) : (
            data?.slice(0,99).map((v, i)=>{
              return((
                <li key={v.id}>
                  <Link to={`/${v.id}`}>{v.id}</Link>
                </li>
              ))
            })
          )
        }
      </ul>
    </>
  )
}

export default Coins;