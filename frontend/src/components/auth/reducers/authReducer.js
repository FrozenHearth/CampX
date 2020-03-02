import { SIGN_UP, LOGIN, IS_AUTHENTICATED } from '../types/types';

const initialState = {
  user: {},
  loggedInUser: {},
  token: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      const { user } = action.payload.data;
      return { ...state, user };
    case LOGIN:
      const { loggedInUser, token } = action.payload.data;
      state.loggedInUser = loggedInUser;
      state.token = token;
      return { ...state };
    case IS_AUTHENTICATED:
      return { ...state, authenticated: true };
    default:
      return state;
  }
};
