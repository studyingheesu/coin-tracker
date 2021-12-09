import styled, { keyframes } from 'styled-components';

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
const Wrapper = styled.div`
  display: flex;
`;
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${(props) => props.bgColor};
  animation: ${rotationAnimation} 1s linear infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box bgColor={'teal'} />
    </Wrapper>
  );
}

export default App;
