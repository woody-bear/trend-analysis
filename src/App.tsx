import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path={"/"} component={FirstPage} />
              <Route exact path={"/search"} component={SearchPage} />
          </Switch>
      </BrowserRouter>
  );
};

export default App;
