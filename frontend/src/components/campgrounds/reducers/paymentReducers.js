import { PAYMENT_STATUS, PAYMENT_SUCCESS } from '../actionTypes/paymentTypes';

const initialState = {
  paymentStatus: 0,
  razorpay_payment_id: '',
  paidCampgroundId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_STATUS:
      if (action.payload.data) {
        const {
          status,
          razorpay_payment_id,
          campgroundId
        } = action.payload.data.paymentDetails;
        state.paymentStatus = status;
        state.razorpay_payment_id = razorpay_payment_id;
        state.paidCampgroundId = campgroundId;
        return { ...state, paidCampgroundId: { ...state.paidCampgroundId } };
      }
      break;
    case PAYMENT_SUCCESS:
      if (action.payload.data) {
        const {
          status,
          razorpay_payment_id,
          campgroundId
        } = action.payload.data;
        state.paymentStatus = status;
        state.razorpay_payment_id = razorpay_payment_id;
        state.paidCampgroundId = campgroundId;
        return { ...state, paidCampgroundId: { ...state.paidCampgroundId } };
      }
      break;
    default:
      return state;
  }
};
