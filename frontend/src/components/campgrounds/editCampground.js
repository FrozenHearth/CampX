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
    const { campground } = this.props;
    if (this.props.match.params.id) {
      this.props.getCampgroundDetails(this.props.match.params.id);
      this.setState({
        title: campground.title,
        description: campground.description,
        cost: campground.cost,
        image: campground.image
      });
    }
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    const { campground } = prevProps;
    this.setState({
      title: campground.title,
      description: campground.description,
      cost: campground.cost,
      image: campground.image
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  updateCampground = () => {
    const title = this.state.title;
    const description = this.state.description;
    const cost = this.state.cost;
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
    return (
      <Card className="add-campground-card">
        <TextField
          name="title"
          className="textfield"
          label="Campground name"
          variant="outlined"
          value={this.state.title || ''}
          onChange={e => this.handleChange(e)}
        />
        <TextField
          name="description"
          className="textfield"
          label="Campground description"
          variant="outlined"
          value={this.state.description || ''}
          onChange={e => this.handleChange(e)}
        />
        <TextField
          name="cost"
          className="textfield"
          type="number"
          label="Campground cost"
          variant="outlined"
          value={this.state.cost || ''}
          onChange={e => this.handleChange(e)}
        />
        <TextField
          name="image"
          className="textfield"
          label="Campground Image"
          variant="outlined"
          value={this.state.image || ''}
          onChange={e => this.handleChange(e)}
        />
        <div className="btn-container">
          <Button
            variant="contained"
            color="primary"
            className="update-campground-btn"
            onClick={this.updateCampground}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCampground);
