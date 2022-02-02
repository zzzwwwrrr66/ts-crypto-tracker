import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getChart } from '../../../api';
import Chart from 'react-apexcharts';

interface IData {
  close: number
  high: number
  low: number
  market_cap: number
  open: number
  time_close: string
  time_open: string
  volume: number
}
interface IProps {
  coinId: string
}
const DetailChart = ({coinId}: IProps) => {
  
  const {isLoading, data} = useQuery<IData[]>(['chart', coinId], ()=>getChart(coinId));
  useEffect(()=>{
    console.log(data);
  }, [data])
  return(
    <>
    <h2>Chart</h2>
    <div style={{display:'flex', justifyContent: 'center'}}>
    {isLoading ? (<p style={{textAlign: 'left'}}>Chart Loading...</p>) : (
      <Chart 
      options={
        {
          chart: {
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: true },
          stroke: {
            width: 4,
          },
          yaxis: {
            
          },
          xaxis: {
            axisTicks: { show: false },
            labels: { show: false },
            type: "datetime",
            categories: data?.map((price) => price.time_close),
            
          },
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(3)}`,
            },
          },
        }
        
      } 
      series={[
        {
          name: "Price",
          data: data?.map((price) => price.close),
        },
      ]}
      
      type="line" 
      width={500} 
      height={320} 
    />
    )}
    
    </div>
    </>
  )
}

export default DetailChart;