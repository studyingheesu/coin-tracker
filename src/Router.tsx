import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}
const Router = ({ toggleDarkMode, isDarkMode }: IRouterProps) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </Route>
        <Route path="/">
          <Coins toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
