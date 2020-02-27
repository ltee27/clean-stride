import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';

class Meetingcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false
    };
  }

  renderIcon() {
    this.props.addFavorite(this.props.input);
    this.setState({
      favorited: true
    });
  }

  removeIcon() {
    this.props.deleteFavorite(this.props.input);
    this.setState({
      favorited: false
    });
  }

  iconConditional() {
    if (this.state.favorited === true) {
      return <div className="favoritedImg"></div>;
    } else if (this.props.input.favorite === '1' && this.state.favorited === true) {
      return <div className="favoritedImg"></div>;
    } else if (this.state.favorited === false) {
      return null;
    }
  }

  buttonConditional() {
    if (this.props.input.favorite === '1' && this.state.favorited === true) {
      return <Button onClick={() => this.removeIcon()} className="mt-2 buttonStyle" size="sm" color="primary">REMOVE</Button>;
    } else if (this.state.favorited === true) {
      return <Button onClick={() => this.removeIcon()} className="mt-2 buttonStyle" size="sm" color="primary">REMOVE</Button>;
    } else {
      return <Button onClick={() => this.renderIcon()} className="mt-2 buttonStyle" size="sm" color="primary">FAVORITE</Button>;

    }
  }

  componentDidMount() {
    if (this.props.input.favorite === '1') {
      this.setState({
        favorited: true
      });
    }
  }

  titleCase(text) {
    let newWord = text.toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return newWord;
  }

  render() {
    return (
      <React.Fragment>
        <Row className="my-3">
          <Col md={{ size: 6, offset: 3 }}>
            <Card className="shadow" style={{ borderColor: 'rgb(218, 218, 218' }}>
              <CardBody>
                {this.iconConditional()}
                <CardTitle>
                  <h5 className="font-weight-bold">{this.props.input.day}</h5>
                  <h6 className="font-weight-bold">{this.props.input.city}</h6>
                  <h6 className="font-weight-bold">{this.props.input.time}</h6>
                </CardTitle>
                <h6 className="mt-1 font-weight-light">{this.props.input.name} {this.props.input.type}</h6>
                <h6 className="mt-2 font-weight-light">{this.props.input.address}, {this.titleCase(this.props.input.city)} {this.props.input.zip}</h6>
                {this.buttonConditional()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Meetingcard;
