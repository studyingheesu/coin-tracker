import styled from 'styled-components';

interface NavProps {
  titleText: string;
  back?: () => void;
}

const GnbBox = styled.div`
  height: 72px;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h1`
  font-size: 24px;
  flex: 1;
  text-align: center;
`;

const NavBar = ({ titleText, back }: NavProps) => {
  return (
    <GnbBox>
      <Title>{titleText}</Title>
    </GnbBox>
  );
};

export default NavBar;
