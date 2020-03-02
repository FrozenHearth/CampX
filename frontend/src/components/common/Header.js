import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../../styles/Header.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: {}
    };
  }

  componentDidMount() {
    const item = JSON.parse(localStorage.getItem('user'));
    this.setState(
      {
        user: item
      },
      () => {
        if (this.state.user) {
          setTimeout(() => {
            this.logout();
            window.location.reload();
          }, 3600000);
        }
      }
    );
  }

  logout = () => {
    toastr.success('Success', 'Logout Successful');
    window.location.reload();
    localStorage.clear();
  };

  render() {
    const user = this.state.user;
    return (
      <>
        <AppBar style={{ background: '#1976d2' }} position="static">
          <Toolbar>
            <Typography variant="h6">
              <NavLink to="/">
                <Button className="brand-name">CampX</Button>
              </NavLink>
            </Typography>
            <Typography variant="h6" component="span">
              <NavLink to="/home">
                <Button className="home-page-btn">Home</Button>
              </NavLink>
            </Typography>
            {!user ? (
              <NavLink className="nav-item-login" to="/login">
                <Button className="login-btn" color="inherit">
                  Login
                </Button>
              </NavLink>
            ) : (
              ''
            )}
            {user ? (
              <Typography
                style={{ marginRight: '6em' }}
                variant="subtitle1"
                className="welcome-msg">
                Welcome to CampX, {user.firstName}!
              </Typography>
            ) : (
              ''
            )}
            {user ? (
              <Button
                className="login-btn"
                color="inherit"
                onClick={this.logout}>
                Logout
              </Button>
            ) : (
              ''
            )}
            {!user ? (
              <NavLink className="nav-item-signup" to="/signup">
                <Button className="login-btn" color="inherit">
                  Sign Up
                </Button>
              </NavLink>
            ) : (
              ''
            )}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
