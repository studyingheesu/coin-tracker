import styled from 'styled-components';

const List = styled.ul``;

const Item = styled.li`
  padding: 10px;
  margin: 20px 0;
  background-color: ${(props) => props.theme.secondBgColor};
  border-radius: 10px;
`;

interface PriceDetail {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

export interface PriceTickData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: PriceDetail;
  };
}

interface PriceProps {
  data?: PriceDetail;
}
const Price = ({ data }: PriceProps) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const { price, ath_price, ath_date, percent_change_1h, percent_change_24h, percent_change_30d } = data;

  return (
    <div>
      <List>
        <Item>Price: ${price}</Item>
        <Item>Changed {percent_change_1h}% in 1 hour</Item>
        <Item>Changed {percent_change_24h}% in 1 day</Item>
        <Item>Changed {percent_change_30d}% in 1 month</Item>
        <Item>
          All-time high: ${ath_price}
          <br />
          at {ath_date}
        </Item>
      </List>
    </div>
  );
};

export default Price;
