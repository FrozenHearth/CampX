import { SIGN_UP, LOGIN } from '../types/authTypes';

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
    default:
      return state;
  }
};
