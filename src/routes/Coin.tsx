import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link, Route, Switch, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { fetchInfo, fetchPrice } from '../api';
import NavBar from '../NavBar';
import Chart from './Chart';
import Price, { PriceTickData } from './Price';

const Container = styled.div`
  padding: 10px 20px;
`;

const LoadingIndicator = styled.span`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.whiteColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isOn: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => (props.isOn ? props.theme.accentColor : props.theme.primaryColor)};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.whiteColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface CoinProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Coin = ({ isDarkMode, toggleDarkMode }: CoinProps) => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');

  const { isLoading: isLoadingInfo, data: info } = useQuery<InfoData>(['info', coinId], () => fetchInfo(coinId));
  const { isLoading: isLoadingPrice, data: priceInfo } = useQuery<PriceTickData>(
    ['price', coinId],
    () => fetchPrice(coinId),
    { refetchInterval: 20000 } // this affects children re-render, so I can't stay at one point on the chart if interval is too short. // how to fix??
  );

  const isLoading = isLoadingInfo || isLoadingPrice;
  const titleText = state?.name ? state.name : isLoading ? 'Loading...' : info?.name || '';

  const history = useHistory();
  const onClickBack = () => history.goBack();

  return (
    <>
      <Helmet>
        <title>{titleText}</title>
      </Helmet>
      <NavBar
        titleText={titleText}
        onClickBack={() => onClickBack()}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <Container>
        {isLoading ? (
          <LoadingIndicator>Loading...</LoadingIndicator>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{info?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${info?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>${priceInfo?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{info?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{priceInfo?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{priceInfo?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab isOn={priceMatch !== null}>
                <Link to={`/${coinId}/price`} replace>
                  Price
                </Link>
              </Tab>
              <Tab isOn={chartMatch !== null}>
                <Link to={`/${coinId}/chart`} replace>
                  Chart
                </Link>
              </Tab>
            </Tabs>
            <Switch>
              <Route path={`/:coinId/price`}>
                <Price data={priceInfo?.quotes.USD} />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} isDarkMode={isDarkMode} />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
};

export default Coin;
