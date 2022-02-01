import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Coins from './components/views/Coin';
import CoinDetail from './components/views/Coin/Detail';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Coins} exact={true} ></Route>
      </Switch>
      <Switch>
        <Route path='/:id' component={CoinDetail} ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
