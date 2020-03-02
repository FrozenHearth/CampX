import {
  MAKE_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_STATUS
} from '../actionTypes/paymentTypes';

import axios from 'axios';
import { authHeader } from '../../../helpers/auth-header';

const API_URL = `http://localhost:5000/api`;

export const actionMakePayment = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/payment`, data, {
        headers: authHeader()
      });
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
      const res = await axios.post(`${API_URL}/payment/success`, data, {
        headers: authHeader()
      });
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
      const res = await axios.get(`${API_URL}/payment/${id}`, {
        headers: authHeader()
      });
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
