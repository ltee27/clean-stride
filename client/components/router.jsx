import React from 'react';
import LandingPage from './landingpage';
import DetailsPage from './details-page';
import Meetings from './meeting-page';
import RecoveryResults from './recoveryresults';
import Favorites from './favorites';
import Calendar from './calendar-page';
import LoadingPage from './loadingpage';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/recoveryresults" render={props => <RecoveryResults {...props} />} />
      <Route path="/detailspage/:name/:place_id" component={DetailsPage} />
      <Route path="/meetings" component={Meetings} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/loadingpage" component={LoadingPage} />
    </div>
  </Router>
);

export default routing;
