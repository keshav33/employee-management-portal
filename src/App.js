import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/redux'
import AddValue from './components/AddValue.jsx'
import ShowValue from './components/ShowValue'
import ListOfValues from './components/ListOfValues'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Provider store={store}>
      <>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={AddValue}></Route>
            <Route path="/add-value" exact component={AddValue}></Route>
            <Route path="/show-value" component={ShowValue}></Route>
            <Route path="/list-of-values" component={ListOfValues}></Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </>
    </Provider>
  );
}

export default App;
