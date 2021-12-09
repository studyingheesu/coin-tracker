import styled from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Coin = () => {
  return <Title>Coin</Title>;
};

export default Coin;
