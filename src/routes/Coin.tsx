import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const LoadingIndicator = styled.span`
  text-align: center;
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading..'}</Title>
      </Header>
      {loading ? <LoadingIndicator>Loading...</LoadingIndicator> : null}
    </Container>
  );
};

export default Coin;
