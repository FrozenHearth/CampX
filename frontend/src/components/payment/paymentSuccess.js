import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionGetPaymentStatus } from '../campgrounds/actions/paymentActions';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from '../common/Header';
import '../../styles/paymentSuccess.css';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  skeletonBox: {
    margin: '4em auto',
    width: '25%'
  },
  paymentSuccessCard: {
    width: '25%',
    margin: '4em auto',
    padding: '3em',
    borderRadius: '0'
  },
  paymentSuccessCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  successIcon: {
    fontSize: '6em'
  },
  navigateBackBtn: {
    marginTop: '1em',
    marginBottom: '1em',
    width: '100%'
  }
};

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      orderId: ''
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props
      .actionGetPaymentStatus(id)
      .then(res => {
        this.setState({
          orderId: res.paymentDetails.razorpay_order_id
        });
      })
      .catch(err => console.log(err));
  }

  navigateToCampgroundDetails = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/campgrounds/${id}`);
  };
  render() {
    const { classes } = this.props;
    const { orderId } = this.state;
    return (
      <>
        <Header {...this.props} />
        {orderId ? (
          <Card className={classes.paymentSuccessCard}>
            <CardContent className={classes.paymentSuccessCardContent}>
              <CheckIcon className={classes.successIcon} />
              <Typography
                style={{ textTransform: 'uppercase' }}
                variant="h6"
                component="h2"
              >
                Payment Successful <br />
                <br />
              </Typography>
              <Typography style={{ textAlign: 'center' }} color="textSecondary">
                Thank you for your payment!
                <br />
                <br />
                Your order id is :
              </Typography>
              <Typography color="textSecondary">
                {orderId} <br />
                <br /> Please save it carefully!{' '}
              </Typography>
              <Button
                className={classes.navigateBackBtn}
                variant="outlined"
                onClick={() => this.navigateToCampgroundDetails()}
              >
                Go Back To Details Page
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box className={classes.skeletonBox}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={356}
              height={504}
            />
            <Skeleton animation="wave" width={356} />
            <Skeleton animation="wave" width={178} />
          </Box>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.auth.loggedInUser,
    paymentStatus: state.payment.paymentStatus,
    paidCampgroundId: state.payment.paidCampgroundId,
    campground: state.campgroundList.campground || ''
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetPaymentStatus
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PaymentSuccess));
