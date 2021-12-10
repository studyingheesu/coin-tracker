import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import NavBar from '../NavBar';

const Container = styled.div`
  padding: 10px 20px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.secondBgColor};
  color: ${(props) => props.theme.darkTextColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const LoadingIndicator = styled.span`
  text-align: center;
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface CoinsProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Coins = ({ toggleDarkMode, isDarkMode }: CoinsProps) => {
  const titleText = '코인';
  const { isLoading, data: coins } = useQuery<CoinInterface[]>('coins', fetchCoins);

  return (
    <>
      <Helmet>
        <title>{titleText}</title>
      </Helmet>
      <NavBar titleText={titleText} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Container>
        {isLoading ? (
          <LoadingIndicator>Loading...</LoadingIndicator>
        ) : (
          <CoinList>
            {coins?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <Icon src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
    </>
  );
};

export default Coins;
