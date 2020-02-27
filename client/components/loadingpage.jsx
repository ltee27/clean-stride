import React from 'react';
import NavBar from './nav-bar';
import { Redirect } from 'react-router-dom';

export default class LoadingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      latitude: undefined,
      longitude: undefined
    };

    this.showPosition = this.showPosition.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  render() {
    if (this.state.latitude) {
      return (
        <Redirect to={'/recoveryresults?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude}/>
      );
    } else {
      return (
        <React.Fragment>
          <NavBar />
          <div className="flexCentering loaderContainer">
            <div className="loader"></div>
          </div>
          <div className="flexCentering loaderText">Loading Results...</div>
        </React.Fragment>
      );
    }
  }
}
