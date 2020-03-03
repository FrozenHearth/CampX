import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCampgroundDetails } from './actions/campgroundActions';
import { actionDeleteCampground } from './actions/campgroundActions';
import {
  actionMakePayment,
  actionPaymentSuccess,
  actionGetPaymentStatus
} from './actions/paymentActions';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import Header from '../common/Header';
import '../../styles/campgroundDetails.css';

class CampgroundDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      paymentBtnText: '',
      token: '',
      disablePaymentBtn: false,
      paidCampgroundId: '',
      paidUserId: '',
      paidAuthorId: '',
      paidUserFirstName: ''
    };
  }

  getCampgroundDetails = () => {
    const { id } = this.props.match.params;
    this.props
      .getCampgroundDetails(id)
      .then(() => {
        const campgroundId = id;

        this.props
          .actionGetPaymentStatus(campgroundId)
          .then(res => {
            if (res.paymentDetails && res.paymentDetails.status === 1) {
              const { campgroundId } = res.paymentDetails;
              const { userId, firstName } = res.paymentDetails._owner;
              this.setState({
                paidCampgroundId: campgroundId,
                paidUserId: userId,
                paidAuthorId: res.paymentDetails._author.userId,
                paidUserFirstName: firstName
              });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  navigate = () => {
    const id = this.props.campground._id;
    this.props.history.push(`/campgrounds/update/${id}`);
  };

  deleteCampground = () => {
    const { id } = this.props.match.params;
    this.props
      .actionDeleteCampground(id)
      .then(() => {
        toastr.success('Success', 'Deleted campground');
      })
      .catch(() => toastr.error('Error', 'Failed to delete campground'));
    this.props.history.push('/home');
  };

  payNow = e => {
    const userId = this.state.loggedInUser._id;
    const campgroundId = this.props.match.params.id;
    const authorId = this.props.campground._author.id;
    const { firstName, email, contactNumber } = this.state.loggedInUser;
    const { title } = this.props.campground;
    e.preventDefault();
    const amount = this.props.campground.cost * 100;
    this.props
      .actionMakePayment({
        amount,
        userId,
        authorId
      })
      .then(res => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        let options = {
          key: process.env.REACT_APP_rzp_key, // Enter the Key ID generated from the Dashboard
          amount: '1000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
          currency: 'INR',
          name: 'CampX',
          description: `Payment for ${title} `,
          order_id: res.order.id,
          handler: response => {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature
            } = response;

            this.props
              .actionPaymentSuccess({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                userId,
                authorId,
                firstName,
                campgroundId
              })
              .then(res => {
                const { id } = this.props.match.params;
                this.props.history.push(
                  `/campgrounds/${id}/payment-success/${res.campgroundId}`
                );
              })
              .catch(err => console.log(err));
          },
          prefill: {
            name: firstName,
            email: email,
            contact: contactNumber
          },
          theme: {
            color: '#528FF0'
          },
          modal: {
            backdropclose: true,
            escape: true
          }
        };

        let rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        token: token
      });
    }
    if (user) {
      delete user.password;
      this.setState({
        loggedInUser: user
      });
    }
    this.getCampgroundDetails();
  }

  render() {
    const { campground } = this.props || '';
    const campgroundId = this.props.match.params.id;

    return (
      <>
        <Header {...this.props} />
        {campground ? (
          <Card className="campground-details-card">
            {campground.image ? (
              <CardMedia
                image={campground.image}
                style={{ minHeight: '700px' }}
              />
            ) : (
              ''
            )}
            <CardContent>
              <Typography
                style={{ fontSize: '1.7em', fontWeight: '500' }}
                gutterBottom
                variant="h5"
                component="h1"
              >
                {campground.title}
                <br />
              </Typography>
              <Typography variant="body1" component="p">
                {campground.description}
                <br />
                <br />
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                &#8377; {campground.cost}
                <br />
                <br />
              </Typography>
              {campground._author ? (
                <Typography
                  style={{ fontStyle: 'italic' }}
                  variant="body1"
                  color="textSecondary"
                  component="p"
                >
                  Submitted by {campground._author.firstName},
                  <br />
                  {moment(campground.createdAt).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
                </Typography>
              ) : (
                ''
              )}
              {campground._author &&
              campground._author.id === this.state.loggedInUser._id &&
              campground._author.id !== this.state.paidAuthorId ? (
                <>
                  <Button
                    variant="contained"
                    className="edit-campground-btn"
                    onClick={this.navigate}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    className="delete-campground-btn"
                    color="secondary"
                    onClick={this.deleteCampground}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                ''
              )}
              {this.state.token &&
              campground._author &&
              this.state.paidCampgroundId !== campgroundId &&
              !this.state.paidUserId &&
              this.state.loggedInUser._id !== campground._author.id ? (
                <Button
                  variant="contained"
                  className="payment-btn"
                  onClick={e => this.payNow(e)}
                >
                  Pay Now
                </Button>
              ) : this.state.token &&
                campground._author &&
                this.state.paidCampgroundId === campgroundId &&
                this.state.paidUserId === this.state.loggedInUser._id &&
                this.state.loggedInUser._id !== campground._author.id ? (
                <Button
                  variant="contained"
                  className="payment-btn"
                  disabled
                  style={{ opacity: '0.5' }}
                >
                  Payment Made
                </Button>
              ) : this.state.token &&
                campground._author &&
                this.state.loggedInUser._id !== campground._author.id &&
                this.state.paidUserId !== this.state.loggedInUser._id ? (
                <Button
                  variant="contained"
                  className="payment-btn"
                  disabled
                  style={{ opacity: '0.5' }}
                >
                  Sold Out
                </Button>
              ) : this.state.token &&
                campground._author &&
                this.state.loggedInUser._id === campground._author.id &&
                campground._author.id !== this.state.paidAuthorId ? (
                ''
              ) : this.state.token &&
                campground._author &&
                this.state.loggedInUser._id === campground._author.id &&
                campground._author.id === this.state.paidAuthorId ? (
                <Button
                  variant="contained"
                  className="payment-btn"
                  disabled
                  style={{ opacity: '0.5' }}
                >
                  Sold To {this.state.paidUserFirstName}
                </Button>
              ) : (
                ''
              )}
            </CardContent>
          </Card>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    campground: state.campgroundList.campground || '',
    loggedInUser: state.auth.loggedInUser,
    token: state.auth.token,
    paymentStatus: state.payment.paymentStatus,
    razorpay_payment_id: state.payment.razorpay_payment_id,
    paidCampgroundId: state.payment.paidCampgroundId
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCampgroundDetails,
      actionDeleteCampground,
      actionMakePayment,
      actionPaymentSuccess,
      actionGetPaymentStatus
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CampgroundDetails);
