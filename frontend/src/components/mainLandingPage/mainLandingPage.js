import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/core/styles';
import '../../styles/mainLandingPage.css';

const styles = {
  homeBtnLink: {
    color: 'white',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  starIcon: {
    marginRight: '5px'
  }
};

const MainLandingPage = props => {
  const { classes } = props;
  return (
    <div className="landing-page-container">
      <div className="hero-container">
        <h1 className="hero-header">CampX</h1>
        <p className="hero-description">
          CampX is a free-for-all portal for campgrounds. <br /> Buy, sell and view
          campgrounds from all over the world.
        </p>
        <hr id="divider" />
        <Link className={classes.homeBtnLink} to="/home">
          <Button className="landing-page-btn" variant="outlined">
            <StarIcon fontSize="small" className={classes.starIcon} /> Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(MainLandingPage);
