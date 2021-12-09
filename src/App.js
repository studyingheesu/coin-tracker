import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Emoji = styled.span``;
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;

  ${Emoji} {
    font-size: 36px;
    &:hover {
      font-size: 60px;
    }
  }
`;

const Circle = styled(Box)`
  border-radius: 100px;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;
const RotatingBox = styled(Box)`
  animation: ${rotationAnimation} 1s linear infinite;
`;

const RequiredInput = styled.input.attrs({ required: true, maxLength: 10 })`
  background-color: lightgray;
`;

function App() {
  return (
    <Wrapper>
      <RotatingBox bgColor={'teal'}>
        <Emoji as="p">😇</Emoji>
        <Emoji as="p">🥰</Emoji>
      </RotatingBox>
      <Emoji as="p">🥸</Emoji>
      <Circle bgColor={'tomato'} />
      <Box bgColor={'yellow'} />
      <RequiredInput type="text" />
      <RequiredInput type="password" />
    </Wrapper>
  );
}

export default App;
