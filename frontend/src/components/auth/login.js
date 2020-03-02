import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionLogMeIn } from './actions/actionAuthenticate';
import Header from '../common/Header';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
    const email = this.state.email;
    const password = this.state.password;
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
    return (
      <>
        <Header {...this.props} />
        <Avatar
          style={{
            backgroundColor: 'rgb(220, 0, 78)',
            margin: '10em auto -7em auto',
            padding: '1.2em'
          }}>
          <LockOutlinedIcon />
        </Avatar>

        <Card className="add-campground-card">
          <TextField
            autoComplete="off"
            name="email"
            type="email"
            className="textfield"
            label="E-Mail"
            variant="outlined"
            value={this.state.email}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            autoComplete="off"
            name="password"
            type="password"
            className="textfield"
            label="Password"
            variant="outlined"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <Button
            variant="contained"
            style={{ background: '#1976d2', marginBottom: '1em' }}
            color="primary"
            onClick={this.logMeIn}>
            Sign In
          </Button>
          <Button
            variant="contained"
            style={{ background: '#1976d2' }}
            color="primary"
            onClick={this.signUp}>
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
)(Login);
