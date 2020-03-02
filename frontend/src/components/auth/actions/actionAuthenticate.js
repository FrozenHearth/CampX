import { SIGN_UP, LOGIN } from '../types/types';

import axios from 'axios';

import { BASE_URL } from '../../../environment';

export const actionSignMeUp = user => {
  return dispatch => {
    return axios
      .post(`${BASE_URL}/users/signup`, user)
      .then(res => {
        dispatch({
          type: SIGN_UP,
          payload: res
        });
        return res.data;
      })
      .catch(err => console.log(err));
  };
};

export const actionLogMeIn = user => {
  return dispatch => {
    return axios
      .post(`${BASE_URL}/users/login`, user)
      .then(res => {
        dispatch({
          type: LOGIN,
          payload: res
        });
        localStorage.setItem('user', JSON.stringify(res.data.loggedInUser));
        localStorage.setItem('token', res.data.token);
        return res.data;
      })
      .catch(err => console.log(err));
  };
};
