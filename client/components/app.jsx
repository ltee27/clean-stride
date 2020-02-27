import React from 'react';
import LandingPage from './landingpage';
import LoadingPage from './loadingpage';
import DetailsPage from './details-page';
import Meetings from './meeting-page';
import RecoveryResults from './recoveryresults';
import Favorites from './favorites';
import Calendar from './calendar-page';
import NavBar from './nav-bar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      view: {
        name: 'landing',
        params: {}
      },
      favorites: {}
    };
    this.setState = this.setState.bind(this);
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    if (this.state.view.name === 'landing') {
      return (
        <React.Fragment>
          <NavBar setView={this.setView}/>
          <LandingPage setView={this.setView}/>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'recoveryresults') {
      return (
        <React.Fragment>
          <NavBar setView={this.setView} />
          <RecoveryResults setView={this.setView} params={this.state.view.params}/>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <NavBar setView={this.setView} />
          <DetailsPage setView={this.setView} data={this.state.view.params.details}/>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'meetings') {
      return (
        <React.Fragment>
          <NavBar setView={this.setView} />
          <Meetings setView={this.setView}/>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'favorites') {
      return (
        <React.Fragment>
          <NavBar setView={this.setView} />
          <Favorites setView={this.setView} favorites={this.state.view.params.favorites}/>
        </React.Fragment>
      );
    } else if (this.state.view.name === 'loading') {
      return (
        <LoadingPage setView={this.setView}/>
      );
    } else if (this.state.view.name === 'calendar') {
      return (
        <React.Fragment>
          <NavBar setView={this.setView}/>
          <Calendar />
        </React.Fragment>
      );
    }
  }
}
