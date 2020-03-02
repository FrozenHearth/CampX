import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionSignMeUp } from './actions/actionAuthenticate';
import Header from '../common/Header';
import LockIcon from '../common/LockIcon';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      avatarName: '',
      contactNumber: '',
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

  signMeUp = () => {
    const {
      firstName,
      lastName,
      avatarName,
      contactNumber,
      email,
      password
    } = this.state;
    const data = {
      firstName,
      lastName,
      avatarName,
      contactNumber,
      email,
      password
    };
    this.props
      .actionSignMeUp(data)
      .then(res => {
        if (res) {
          toastr.success(
            'Success',
            'Registration Successful! Please enter your E-mail and password to log-in'
          );
          this.props.history.push('/login');
        } else {
          toastr.error('Error', 'Registration Unsucessful');
        }
      })
      .catch(err => {
        toastr.error(`${err}`, 'Registration Unsucessful');
      });
  };
  render() {
    const {
      firstName,
      lastName,
      avatarName,
      contactNumber,
      email,
      password
    } = this.state;

    return (
      <>
        <Header {...this.props} />

        <LockIcon />
        <Card className="add-campground-card">
          <TextField
            autoComplete="off"
            name="firstName"
            className="textfield"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            autoComplete="off"
            name="lastName"
            className="textfield"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            autoComplete="off"
            name="contactNumber"
            className="textfield"
            label="Contact Number"
            variant="outlined"
            value={contactNumber}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            autoComplete="off"
            name="avatarName"
            className="textfield"
            label="Avatar Name"
            variant="outlined"
            value={avatarName}
            onChange={e => this.handleChange(e)}
          />
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
            style={{ background: '#1976d2' }}
            color="primary"
            onClick={this.signMeUp}
          >
            Sign Up
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
      actionSignMeUp
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToprops)(SignUp);
