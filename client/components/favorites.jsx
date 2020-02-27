import React from 'react';
import { Container, Row, Col, Card, Button, CardTitle } from 'reactstrap';
import NavBar from './nav-bar';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: null
    };

    this.getFavorites = this.getFavorites.bind(this);
    this.addToCalendarBackEnd = this.addToCalendarBackEnd.bind(this);
  }

  getFavorites() {
    fetch('/api/favorites.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          favorites: myJson
        });
      });
  }

  componentDidMount() {
    this.getFavorites();
  }

  addToCalendarBackEnd(id) {
    fetch('/api/calendar.php', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  titleCase(text) {
    let newWord = text.toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return newWord;
  }

  favoritesCards() {
    const cardCreator = this.state.favorites.map((data, index) => {
      return (
        <Card key={index} className="my-3 shadow" body style={{ borderColor: 'rgb(218, 218, 218' }}>
          <Row>
            <Col>
              <div className="favoritedImg2"></div>
            </Col>
          </Row>
          <CardTitle className="cardTitle text-center mt-3">{data.program}<br/>{data.name}</CardTitle>
          <Row className="flexCentering favoritesText mt-1">
            <Col className="favoriteDayStyle" xs={{ size: 4 }} md={{ size: 3, offset: 2 }}>
              {data.day}
            </Col>
            <Col xs={{ size: 4 }} md={{ size: 3, offset: 0 }}>
              {data.city}
            </Col>
            <Col xs={{ size: 3 }} md={{ size: 4, offset: 0 }}>
              {data.time}
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 text-center">
              {data.address}, {this.titleCase(data.city)} {data.zip}
            </Col>
          </Row>
          <Row>
            {

            }
            <Col xs={{ size: 8, offset: 3 }} md={{ size: 4, offset: 5 }}>
              <Button onClick={() => this.addToCalendarBackEnd(data)} className="buttonStyle font-weight-bold mt-2" color="primary" size="sm">ADD TO CALENDAR</Button>
            </Col>
          </Row>
        </Card>
      )
      ;
    });

    return (cardCreator);
  }

  render() {
    if (this.state.favorites !== null) {
      return (
        <React.Fragment>
          <NavBar />
          <Container>
            <Row className="mt-4">
              <Col xs={{ size: 10, offset: 1 }}>
                <h3 className="text-center text-secondary"><span><i className="fas fa-star"/></span> Favorite Meetings</h3>
              </Col>
            </Row>
            {this.favoritesCards()}
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        null
      );
    }
  }
}
