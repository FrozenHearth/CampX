import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CampgroundLanding from './components/campgrounds/landingPage';
import AddCampground from './components/campgrounds/addCampground';
import EditCampground from './components/campgrounds/editCampground';

import CampgroundDetails from './components/campgrounds/campgroundDetails';
import PaymentSuccess from './components/payment/paymentSuccess';
import SignUp from './components/auth/signUp';
import Login from './components/auth/login';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      getState={state => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/home" component={CampgroundLanding} />
        <Route path="/campgrounds/add" component={AddCampground} />
        <Route path="/campgrounds/update/:id" component={EditCampground} />
        <Route exact path="/campgrounds/:id" component={CampgroundDetails} />
        <Route
          exact
          path="/campgrounds/:id/payment-success/:paymentId"
          component={PaymentSuccess}
        />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  </Provider>,
  rootElement
);
