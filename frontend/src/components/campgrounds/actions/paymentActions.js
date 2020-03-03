import {
  MAKE_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_STATUS
} from '../actionTypes/paymentTypes';

import axios from 'axios';
import { authHeader } from '../../../helpers/auth-header';

export const actionMakePayment = data => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment`,
        data,
        {
          headers: authHeader()
        }
      );
      dispatch({
        type: MAKE_PAYMENT,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionPaymentSuccess = data => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment/success`,
        data,
        {
          headers: authHeader()
        }
      );
      dispatch({
        type: PAYMENT_SUCCESS,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionGetPaymentStatus = id => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/payment/${id}`,
        {
          headers: authHeader()
        }
      );
      dispatch({
        type: PAYMENT_STATUS,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};
