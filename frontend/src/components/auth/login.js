import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionLogMeIn } from './actions/actionAuthenticate';
import Header from '../common/Header';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '../common/LockIcon';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const styles = {
  signInBtn: {
    background: '#1976d2',
    marginBottom: '1em'
  },
  signUpBtn: {
    background: '#1976d2'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  logMeIn = () => {
    const { email, password } = this.state;
    const data = {
      email,
      password
    };
    this.props
      .actionLogMeIn(data)
      .then(res => {
        if (res.token && res.loggedInUser) {
          toastr.success('Success', 'Login Successful');
          this.props.history.push('/home');
        }
      })
      .catch(err => {
        toastr.error(
          'Error',
          'Failed to login. Please enter correct credentials'
        );
        console.log(err);
      });
  };

  signUp = () => {
    this.props.history.push('/signup');
  };

  render() {
    const { email, password } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Header {...this.props} />
        <LockIcon />

        <Card className="add-campground-card">
          <TextField
            autoComplete="off"
            name="email"
            type="email"
            className="textfield"
            label="E-Mail"
            variant="outlined"
            value={email}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            autoComplete="off"
            name="password"
            type="password"
            className="textfield"
            label="Password"
            variant="outlined"
            value={password}
            onChange={e => this.handleChange(e)}
          />
          <Button
            variant="contained"
            className={classes.signInBtn}
            color="primary"
            onClick={this.logMeIn}
          >
            Sign In
          </Button>
          <Button
            className={classes.signUpBtn}
            variant="contained"
            color="primary"
            onClick={this.signUp}
          >
            Don't have an account? Click to Sign Up
          </Button>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToprops = dispatch => {
  return bindActionCreators(
    {
      actionLogMeIn
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(withStyles(styles)(Login));
