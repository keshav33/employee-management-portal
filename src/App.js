import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/redux'
import { Loader } from 'semantic-ui-react'
const Login = React.lazy(()=> import('./components/Login'))
const Signup = React.lazy(()=> import('./components/Signup'))
const AddValue = React.lazy(() => import('./components/AddValue.jsx'))
const ShowValue = React.lazy(() => import('./components/ShowValue'))
const ListOfValues = React.lazy(() => import('./components/ListOfValues'))
const Logout = React.lazy(()=> import('./components/Logout'))
const Navbar = React.lazy(() => import('./components/Navbar'))
const Footer = React.lazy(() => import('./components/Footer'))
const Notfound = React.lazy(()=> import('./components/Notfound'))

function App() {
  return (
    <Suspense fallback={<Loader active inline='centered' inverted content='Loading...!'/>}>
      <Provider store={store}>
        <>
          <Router>
            <Navbar></Navbar>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/signup" exact component={Signup}></Route>
              <Route path="/add-value" exact component={AddValue}></Route>
              <Route path="/show-value" component={ShowValue}></Route>
              <Route path="/list-of-values" component={ListOfValues}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="*" component={Notfound}></Route> 
            </Switch>
            <Footer></Footer>
          </Router>
        </>
      </Provider>
    </Suspense>
  );
}

export default App;
