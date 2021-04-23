import { Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Budget } from './pages/Budget';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/budget" component={Budget} />
    </Switch>
  );
};

export default Routes;
