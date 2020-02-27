import React from 'react';
import { Form, FormGroup, Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavBar from './nav-bar';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchZone: ''
    };

    this.handleSearchZoneChange = this.handleSearchZoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchZoneChange(event) {
    this.setState({ searchZone: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      searchZone: ''
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container className="landingPage">
          <Row className="ml-2">
            <Col xs={{ size: 6 }} sm={{ size: 3 }} lg={{ size: 6, offset: 4 }}>
              <img src="./images/transparentLogo.png" height="300" alt="App Logo"/>
            </Col>
            <Col className="landingForm" xs={{ size: 10, offset: 1 }} sm={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }}>
              <Form onSubmit={this.handleSubmit} action="">
                <FormGroup>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control shadow" maxLength="19" placeholder="City or Zipcode" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.searchZone} onChange={this.handleSearchZoneChange}/>
                    <div className="input-group-append">
                      <Link to={'/recoveryresults/?locale=' + this.state.searchZone}>
                        <button className="btn btn-pirmary btn-outline-primary shadow" color="primary" type="Submit">Search</button>
                      </Link>
                    </div>
                  </div>
                  <Row className="mt-1">
                    <Col xs={{ size: 10, offset: 2 }} md={{ size: 10, offset: 3 }} lg={{ size: 10, offset: 4 }}>
                      <Link to='/loadingpage'>
                        <Button className="shadow" type="button" color="primary">Use My Location</Button>{' '}
                      </Link>
                    </Col>
                  </Row>
                  <Row className="mt-1 mr-2">
                    <Col xs={{ size: 10, offset: 2 }} md={{ size: 10, offset: 3 }} lg={{ size: 10, offset: 4 }}>
                      <Link to="/meetings">
                        <Button className="shadow" type="button" color="secondary">Meeting Directory</Button>{' '}
                      </Link>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
