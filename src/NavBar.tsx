import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkModeAtom } from './atoms';

interface NavProps {
  titleText: string;
  onClickBack?: () => void;
}

const GnbBox = styled.div`
  height: 72px;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.whiteColor};
`;

const Title = styled.h1`
  font-size: 24px;
  flex: 1;
  text-align: center;
`;

// should work on this
const LeftButton = styled.button`
  display: block;
  width: 100px;
`;
const RightButton = styled.button`
  display: block;
  width: 100px;
`;

const NavBar = ({ titleText, onClickBack }: NavProps) => {
  const isDarkMode = useRecoilValue(isDarkModeAtom);
  const setIsDarkMode = useSetRecoilState(isDarkModeAtom);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <GnbBox>
      {onClickBack && <LeftButton onClick={onClickBack}>&larr</LeftButton>}
      <Title>{titleText}</Title>
      <RightButton onClick={toggleDarkMode}>{isDarkMode ? 'Light' : 'Dark'}</RightButton>
    </GnbBox>
  );
};

export default NavBar;
