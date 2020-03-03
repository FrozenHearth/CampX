import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import '../../styles/addCampground.css';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCampgroundDetails,
  actionUpdateCampground,
  actionDeleteCampground
} from './actions/campgroundActions';

class EditCampground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      cost: '',
      image: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { title, description, cost, image } = this.props.campground;
    if (id) {
      this.props.getCampgroundDetails(id);
      this.setState({
        title,
        description,
        cost,
        image
      });
    }
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    const { title, description, cost, image } = prevProps.campground;
    this.setState({
      title,
      description,
      cost,
      image
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  updateCampground = () => {
    const { title, description, cost } = this.state;
    const id = this.props.campground._id;
    const data = {
      title,
      description,
      cost,
      id
    };
    this.props
      .actionUpdateCampground(data)
      .then(() => {
        toastr.success('Success', 'Updated campground');
        this.props.history.push(`/campgrounds/${id}`);
      })
      .catch(() => toastr.error('Error', 'Failed to update campground'));
  };

  render() {
    const { title, description, cost, image } = this.state;
    return (
      <Card className="add-campground-card">
        <TextField
          name="title"
          className="textfield"
          label="Campground name"
          variant="outlined"
          value={title || ''}
          onChange={e => this.handleChange(e)}
        />
        <TextField
          name="description"
          className="textfield"
          label="Campground description"
          variant="outlined"
          value={description || ''}
          onChange={e => this.handleChange(e)}
        />
        <TextField
          name="cost"
          className="textfield"
          type="number"
          label="Campground cost"
          variant="outlined"
          value={cost || ''}
          onChange={e => this.handleChange(e)}
        />
        <TextField
          name="image"
          className="textfield"
          label="Campground Image"
          variant="outlined"
          value={image || ''}
          onChange={e => this.handleChange(e)}
        />
        <div className="btn-container">
          <Button
            variant="contained"
            color="primary"
            className="update-campground-btn"
            onClick={this.updateCampground}
          >
            Update Campground
          </Button>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    campground: state.campgroundList.campground || ''
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCampgroundDetails,
      actionUpdateCampground,
      actionDeleteCampground
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampground);
