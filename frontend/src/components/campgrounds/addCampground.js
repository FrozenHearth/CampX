import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import Button from '@material-ui/core/Button';
import Header from '../common/Header';
import '../../styles/addCampground.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actionAddCampground,
  getCampgroundDetails
} from './actions/campgroundActions';

class AddCampground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      cost: '',
      image: '',
      disableBtn: true
    };
  }

  handleChange = e => {
    const { title, description } = this.state;
    if (title !== '' && description !== '') {
      this.setState({
        disableBtn: false
      });
    }
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addCampground = () => {
    const { title, description, cost, image } = this.state;
    this.props
      .actionAddCampground({
        title,
        description,
        cost,
        image
      })
      .then(res => {
        if (res.campground) {
          toastr.success('Success', 'Campground Added!');
        }
      })
      .catch(err => {
        toastr.error('Error', 'Failed to add campground');
        console.log(err);
      });
    this.props.history.push('/home');
  };

  render() {
    const { title, description, cost, image, disableBtn } = this.state;

    return (
      <>
        <Header {...this.props} />
        <Card className="add-campground-card">
          <CardContent>
            <Typography
              style={{ fontWeight: '400' }}
              className="text-center"
              variant="h6"
              component="h6"
            >
              Add Your Campground
            </Typography>
          </CardContent>
          <TextField
            autoComplete="off"
            name="title"
            className="textfield"
            label="Campground name"
            variant="outlined"
            value={title}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            autoComplete="off"
            name="description"
            className="textfield"
            label="Campground description"
            inputProps={{
              maxLength: '500'
            }}
            variant="outlined"
            rows="8"
            multiline
            value={description}
            onChange={e => this.handleChange(e)}
          />
          <TextField
            autoComplete="off"
            name="cost"
            className="textfield"
            type="number"
            label="Cost &#8377;"
            inputProps={{ min: '0' }}
            variant="outlined"
            value={cost}
            onChange={e => this.handleChange(e)}
          />

          <TextField
            autoComplete="off"
            name="image"
            className="textfield"
            label="Campground Image"
            variant="outlined"
            value={image}
            onChange={e => this.handleChange(e)}
          />
          <Button
            className="add-campground"
            variant="contained"
            color="primary"
            disabled={disableBtn === true}
            onClick={this.addCampground}
          >
            Add Campground
          </Button>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    campground: state.campgroundList.singleCampground || ''
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionAddCampground,
      getCampgroundDetails
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCampground);
