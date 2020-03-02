import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionGetAllCampgrounds } from './actions/campgroundActions';
import moment from 'moment';
import Header from '../common/Header';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';
import '../../styles/landingPage.css';
import { bindActionCreators } from 'redux';
import tent from '../../assets/tent.png';
import { CardActionArea } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class CampgroundLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showProgressBar: false,
      jumbotronText: ''
    };
  }
  componentDidMount() {
    this.setState(
      {
        showProgressBar: true
      },
      () => {
        this.props
          .actionGetAllCampgrounds()
          .then(() => {
            const item = JSON.parse(localStorage.getItem('user'));
            this.setState({
              user: item
            });
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.setState({
              showProgressBar: false
            });
          });
      }
    );
  }

  navigateToAddCampground = () => {
    this.props.history.push('/campgrounds/add');
  };

  navigateToSignUp = () => {
    this.props.history.push('/signup');
  };

  navigateToLogin = () => {
    this.props.history.push('/login');
  };

  trunc = (string, length, delimiter) => {
    if (length) {
      delimiter = delimiter || '...';
      return string.length > length
        ? string.substr(0, length) + delimiter
        : string;
    }
  };

  render() {
    const { campgrounds } = this.props;

    const user = this.state.user;

    const showProgressBar = this.state.showProgressBar;

    return (
      <>
        {showProgressBar === true ? <LinearProgress /> : ''}
        <Header {...this.props} />
        {/* Jumbotron Start */}
        <Card className="jumbotron-container">
          <CardContent>
            <img
              style={{ marginTop: '-1em' }}
              height="50px"
              width="50px"
              src={tent}
              alt="Campground icon"
            />
            <Typography
              className="jumbotron-header"
              variant="h3"
              component="h6">
              Welcome to CampX!
            </Typography>
            <Typography className="jumbotron-para" variant="h6" component="p">
              View campgrounds submitted from all over the world.
              <br />
            </Typography>
            {!user ? (
              <Typography className="jumbotron-para" variant="h6" component="p">
                Go ahead; create your account by clicking on the Sign Up button
                and then create your own campgrounds, view, sell or buy other
                campgrounds.
                <br />
                If you've already created an account, click on Log In to log
                back in.
              </Typography>
            ) : (
              <Typography className="jumbotron-para" variant="h6" component="p">
                Go ahead and add more!
              </Typography>
            )}
            {user ? (
              <Button
                className="add-campground-btn"
                variant="outlined"
                color="default"
                onClick={this.navigateToAddCampground}>
                Add Campground
              </Button>
            ) : (
              <>
                <Button
                  className="go-to-signUp-btn"
                  variant="outlined"
                  color="default"
                  onClick={this.navigateToSignUp}>
                  Sign Up
                </Button>
                <Button
                  className="go-to-login-btn"
                  variant="outlined"
                  color="default"
                  onClick={this.navigateToLogin}>
                  Login
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        {/* Jumbotron End */}
        <div className="campground-card-container">
          {!campgrounds.length && user ? (
            <Typography
              style={{ margin: '2em auto', fontSize: '1.2em' }}
              gutterBottom
              variant="subtitle1"
              component="p">
              Please add a campground to get started.
            </Typography>
          ) : campgrounds.length ? (
            campgrounds.map((campground, index) => (
              <Card
                style={{ width: '400px' }}
                className="campground-card"
                key={index}>
                <CardHeader
                  subheader={moment(campground.createdAt).format('LL')}
                  title={
                    campground._author
                      ? campground._author.firstName
                      : 'No author'
                  }
                  avatar={
                    <Avatar aria-label="recipe">
                      {campground._author.firstName.slice(0, 1)}
                    </Avatar>
                  }
                />
                {campground.image ? (
                  <CardMedia
                    image={campground.image}
                    style={{ minHeight: '350px' }}
                  />
                ) : (
                  ''
                )}
                <CardContent>
                  <Typography
                    style={{ fontSize: '1.3em', fontWeight: '500' }}
                    gutterBottom
                    variant="h5"
                    component="h1">
                    {campground.title}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {/* {campground.description} */}
                    {this.trunc(campground.description, 40)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p">
                    &#8377; {campground.cost}
                    {/* {this.trunc(campground.description, 50)} */}
                  </Typography>
                </CardContent>

                <CardActionArea className="onHoverViewDetails">
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'black'
                    }}
                    to={`/campgrounds/${campground._id}`}>
                    <CardContent>
                      <Typography variant="body1" component="p">
                        View Details
                        <ChevronRightIcon style={{ float: 'right' }} />
                      </Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            ))
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    campgrounds: state.campgroundList.campgrounds,
    loggedInUser: state.auth.loggedInUser
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetAllCampgrounds
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampgroundLanding);
