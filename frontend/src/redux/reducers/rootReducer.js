import { combineReducers } from 'redux';

import campgroundList from '../../components/campgrounds/reducers/campgroundReducers';
import auth from '../../components/auth/reducers/authReducer';
import payment from '../../components/campgrounds/reducers/paymentReducers';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  toastr: toastrReducer,
  campgroundList,
  auth,
  payment
});
