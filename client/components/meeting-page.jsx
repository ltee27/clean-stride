/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button, Card, InputGroup, CardTitle } from 'reactstrap';
import Meetingcard from './meeting-card';
import NavBar from './nav-bar';
import { Link } from 'react-router-dom';

export default class Meetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      day: null,
      city: 'CITY (optional)',
      meetings: {

      },
      favorites: {
      },
      search: false
    };
    this.getMeetings = this.getMeetings.bind(this);
    this.handleChangeDay = this.handleChangeDay.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeProgram = this.handleChangeProgram.bind(this);
    this.renderMeetingcards = this.renderMeetingcards.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  getMeetings() {
    fetch('/api/meetings.php?day=' + this.state.day + '&program=' + this.state.program + '&city=' + this.state.city)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          meetings: myJson,
          search: true
        });
      });
  }

  addFavorite(newMeeting) {
    fetch('/api/favorites.php', {
      method: 'POST',
      body: JSON.stringify(newMeeting),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  deleteFavorite(meetingId) {
    fetch('/api/favorites.php', {
      method: 'DELETE',
      body: JSON.stringify(meetingId),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  handleChangeDay(event) {
    this.setState({
      day: event.target.value
    });
  }

  handleChangeCity(event) {
    this.setState({
      city: event.target.value
    });
  }

  handleChangeProgram(event) {
    this.setState({
      program: event.target.value
    });
  }

  renderMeetingcards() {
    return this.state.meetings.map(input => {
      return (
        <Meetingcard key={input.id} input={input} deleteFavorite={this.deleteFavorite} addFavorite={this.addFavorite}/>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container className="meetingContainer" xs={{ fluid: true }}>
          <Row className="mt-4">
            <Col xs={{ size: 10, offset: 1 }}>
              <h3 className="text-center text-secondary"><span><i className="far fa-handshake"></i></span> Meeting Directory</h3>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={{ size: 10, offset: 1 }}>
              <Form>
                <FormGroup>
                  <InputGroup>
                    <Input style={{ backgroundColor: '#A9A9A9', borderColor: '#A9A9A9' }} className="shadow text-white" type="select" name="" id="exampleSelect" onChange={this.handleChangeProgram}>
                      <option>PROGRAM</option>
                      <option>AA</option>
                      <option>Al-Anon</option>
                      <option>NA</option>
                      <option>OA</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Input style={{ backgroundColor: '#A9A9A9', borderColor: '#A9A9A9' }} className="shadow text-white" type="select" name="" id="exampleSelect" onChange={this.handleChangeCity}>
                    <option>CITY (optional)</option>
                    <option>ALISO VIEJO</option>
                    <option>COSTA MESA</option>
                    <option>DANA POINT</option>
                    <option>IRVINE</option>
                    <option>LAGUNA BEACH</option>
                    <option>LAGUNA WOODS</option>
                    <option>LAGUNA HILLS</option>
                    <option>LAKE FOREST</option>
                    <option>MISSION VIEJO</option>
                    <option>NEWPORT BEACH</option>
                    <option>RANCHO SANTA MARGARITA</option>
                    <option>SAN JUAN CAPISTRANO</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input style={{ backgroundColor: '#A9A9A9', borderColor: '#A9A9A9' }} className="shadow text-white" type="select" name="" id="exampleSelect" onChange={this.handleChangeDay}>
                    <option>DAY</option>
                    <option>SUNDAY</option>
                    <option>MONDAY</option>
                    <option>TUESDAY</option>
                    <option>WEDNESDAY</option>
                    <option>THURSDAY</option>
                    <option>FRIDAY</option>
                    <option>SATURDAY</option>
                  </Input>
                </FormGroup>
                <Row>
                  <Col xs={{ size: 4, offset: 2 }} md={{ size: 3, offset: 3 }}>
                    <Button className="shadow" onClick={this.getMeetings} color="info" size="sm">Search</Button>
                  </Col>
                  <Col xs={{ size: 4 }} md={{ size: 3, offset: 1 }}>
                    <Link to="/favorites">
                      <Button className="shadow" color="secondary" size="sm">Favorites</Button>
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {this.state.program === 'AA' &&
        <Row className="mt-2">
          <Col md={{ size: 6, offset: 3 }}>
            <Card body inverse color="info">
              <CardTitle className="text-center"><h5>Alcoholics Anonymous</h5></CardTitle>
              <h6 className="text-center">Orange County AA: <br/> (714) 556-4555</h6>
              <ul>
                <li><span className="font-weight-bold">C</span> = Closed, alcholics only</li>
                <li><span className="font-weight-bold">O</span> = Open</li>
                <li><span className="font-weight-bold">Y</span> = Young People</li>
                <li><span className="font-weight-bold">~</span> = Spanish speaking</li>
                <li><span className="font-weight-bold">W</span> = Women's</li>
                <li><span className="font-weight-bold">M</span> = Men's</li>
                <li><span className="font-weight-bold">GA</span> = Gay</li>
                <li><span className="font-weight-bold">CC</span> = Childcare Available</li>
                <li><span className="font-weight-bold">BG</span> = Beginner</li>
                <li><span className="font-weight-bold">TA</span> = Meditation</li>
                <li><span className="font-weight-bold">SP</span> = Speaker</li>
                <li><span className="font-weight-bold">SE</span> = Secular</li>
                <li><span className="font-weight-bold">TG</span> = Transgender</li>
              </ul>
            </Card>
          </Col>
        </Row>
          }
          {this.state.program === 'Al-Anon' &&
        <Row className="mt-2">
          <Col md={{ size: 6, offset: 3 }}>
            <Card body inverse color="danger" className="shadow">
              <CardTitle className="text-center"><h5>Al-Anon</h5></CardTitle>
              <h6 className="text-center">Al-Anon Family Groups (toll-free):<br/> (888) 425-2666</h6>
              <ul>
                <li><span className="font-weight-bold">O</span> = Open Meetings - Visitors are welcome to attend, but MAY NOT PARTICIPATE</li>
                <li><span className="font-weight-bold">W</span> = Wheelchair Accessible</li>
                <li><span className="font-weight-bold">B</span> = Beginner's meeting</li>
                <li><span className="font-weight-bold">A</span> = Al-Anon and Alateen meetings at the same time and location</li>
                <li><span className="font-weight-bold">Y</span> = Al-Anon and Young Alateen meetings at the same time and location</li>
              </ul>
            </Card>
          </Col>
        </Row>
          }
          {this.state.program === 'NA' &&
        <Row className="mt-2">
          <Col md={{ size: 6, offset: 3 }}>
            <Card body inverse className="shadow" style={{ backgroundColor: '#800080', borderColor: '#800080' }}>
              <CardTitle className="text-center"><h5>Narcotics Anonymous</h5></CardTitle>
              <h6 className="text-center">24-Hour Helpline: <br /> (714) 590-2388</h6>
              <ul>
                <li><span className="font-weight-bold">7D</span> = Seven days per week.</li>
                <li><span className="font-weight-bold">BK</span> = Book Study - Approved NA literature.</li>
                <li><span className="font-weight-bold">C</span> = Closed</li>
                <li><span className="font-weight-bold">CC</span> = Child Care</li>
                <li><span className="font-weight-bold">CN</span> = Candlelight</li>
                <li><span className="font-weight-bold">D</span> = Discussion - This meeting invites participation by all attendees.</li>
                <li><span className="font-weight-bold">LT</span> = Literature Study</li>
                <li><span className="font-weight-bold">M</span> = Men Only</li>
                <li><span className="font-weight-bold">NC</span> = No Children</li>
                <li><span className="font-weight-bold">NS</span> = Non-Smoking - Smoking is not allowed at this meeting.</li>
                <li><span className="font-weight-bold">O</span> = Open - This meeting is open to addicts and non-addicts alike. All are welcome</li>
                <li><span className="font-weight-bold">QA</span> = Question/Answer</li>
                <li><span className="font-weight-bold">OUT</span> = Meeting Held Outside</li>
                <li><span className="font-weight-bold">S</span> = Smoking</li>
                <li><span className="font-weight-bold">SS</span> = Step Study</li>
                <li><span className="font-weight-bold">SP</span> = Spanish</li>
                <li><span className="font-weight-bold">W</span> = Women Only</li>
                <li><span className="font-weight-bold">Y</span> = Youth</li>
              </ul>
            </Card>
          </Col>
        </Row>
          }
          {this.state.program === 'OA' &&
        <Row className="mt-2">
          <Col md={{ size: 6, offset: 3 }}>
            <Card body inverse className="shadow" color="success">
              <CardTitle className="text-center"><h5>Overeaters Anonymous</h5></CardTitle>
              <h6 className="text-center">Call for more information: <br /> (505) 891-4320</h6>
              <ul>
                <li><span className="font-weight-bold">Open Meeting:</span> Open to OA members and non-OA visitors. All meetings are considered open unless otherwise indicated.</li>
                <li><span className="font-weight-bold">Closed Meeting:</span> Open to anyone with a desire to stop eating compulsively or anyone who thinks they may have a problem with compulsive overeating.</li>
                <li><span className="font-weight-bold">Special Focus Meetings:</span> (LGBT, Women's, 100-pounders, maintainers, anorexic/bulimic, etc) are composed of individuals who feel they can more readily identify with fellow OAers with similar attributes.</li>
                <li><span className="font-weight-bold">Special Topic Meetings:</span> (Big Book Study, Lifeline, Pseaker, Newcomer, etc.) have a defined topic of discussion.</li>
              </ul>
            </Card>
          </Col>
        </Row>
          }
          {this.state.search === true &&
          this.renderMeetingcards()
          }
        </Container>
      </React.Fragment>
    );
  }
}
