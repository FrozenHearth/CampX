import {
  GET_ALL_CAMPGROUNDS,
  ADD_CAMPGROUND,
  GET_CAMPGROUND_DETAILS,
  UPDATE_CAMPGROUND,
  DELETE_CAMPGROUND
} from '../actionTypes/types';

import axios from 'axios';
import { authHeader } from '../../../helpers/auth-header';

export const actionGetAllCampgrounds = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/campgrounds`
      );
      dispatch({
        type: GET_ALL_CAMPGROUNDS,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionAddCampground = campground => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/campgrounds`,
        campground,
        {
          headers: authHeader()
        }
      );
      dispatch({
        type: ADD_CAMPGROUND,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const getCampgroundDetails = id => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/campgrounds/${id}`,
        {
          headers: authHeader()
        }
      );
      dispatch({
        type: GET_CAMPGROUND_DETAILS,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionUpdateCampground = campground => {
  return async dispatch => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/campgrounds/${campground.id}`,
        campground,
        {
          headers: authHeader()
        }
      );
      dispatch({
        type: UPDATE_CAMPGROUND,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionDeleteCampground = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/campgrounds/${id}`,
        {
          headers: authHeader()
        }
      );
      dispatch({
        type: DELETE_CAMPGROUND,
        payload: res
      });
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };
};
