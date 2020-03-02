import {
  GET_ALL_CAMPGROUNDS,
  ADD_CAMPGROUND,
  GET_CAMPGROUND_DETAILS,
  UPDATE_CAMPGROUND,
  DELETE_CAMPGROUND
} from '../actionTypes/types';

const initialState = {
  campgrounds: [],
  campground: {},
  editedCampground: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CAMPGROUNDS:
      const { campgroundList } = action.payload.data;
      state.campgrounds = campgroundList;

      return { ...state };
    case ADD_CAMPGROUND:
      const { campground } = action.payload.data;
      return {
        ...state,
        campgrounds: [...state.campgrounds, campground],
        campground
      };
    case GET_CAMPGROUND_DETAILS:
      const { singleCampground } = action.payload.data;
      state.campground = singleCampground;
      return { ...state };
    case UPDATE_CAMPGROUND:
      const { editedCampground } = action.payload.data;
      state.editedCampground = editedCampground;
      const updatedCampgrounds = [];
      return {
        ...state,
        campgrounds: [...updatedCampgrounds, { ...editedCampground }],
        editedCampground
      };
    case DELETE_CAMPGROUND:
      const { deletedCampground } = action.payload.data;
      return {
        ...state,
        campgrounds: [
          ...state.campgrounds.filter(
            campground => campground._id !== deletedCampground._id
          )
        ]
      };
    default:
      return state;
  }
};
