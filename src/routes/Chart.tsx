import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';

import { fetchCoinHistory } from '../api';

interface ICoinHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  isDarkMode: boolean;
}

const Chart = ({ coinId, isDarkMode }: ChartProps) => {
  const { isLoading, data } = useQuery<ICoinHistory[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 5000,
  });

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((tick) => ({
                x: new Date(tick.time_open),
                y: [tick.open, tick.high, tick.low, tick.close],
              })),
            },
          ]}
          height={350}
          options={{
            theme: {
              mode: isDarkMode ? 'dark' : 'light',
            },
            chart: {
              type: 'candlestick',
              height: 350,
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: false,
              },
            },
            xaxis: {
              type: 'datetime',
              tooltip: { enabled: false },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
