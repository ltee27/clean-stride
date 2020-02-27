import React from 'react';
import dateFns from 'date-fns';
import NavBar from './nav-bar';
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      calendarList: undefined,
      sortedMeetings: null,
      clickedMeeting: {
        modal: false,
        info: null
      }
    };
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.getCalendarList = this.getCalendarList.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deleteFromCalendarBackEnd = this.deleteFromCalendarBackEnd.bind(this);
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY';

    return (
      <Row className="header flex-middle rowStyle">
        <Col xs={{ size: 4 }} className="col-start colStyle">
          <div className = "icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </Col>
        <Col className="col-center colStyle">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </Col>
        <Col className="col-end colStyle" onClick={this.nextMonth}>
          <div className="icon">
            chevron_right
          </div>
        </Col>
      </Row>
    );
  }

  renderDays() {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <Col className="col-center col-style colStyle" key={i}>
          {daysOfWeek[i]}
        </Col>
      );
    }
    return <Row className="days rowStyle">{days}</Row>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <Col className={`colStyle cell ${!dateFns.isSameMonth(day, monthStart)
            ? 'disabled'
            : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''
          }`}
          key={day}
          onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span>{this.renderMeetings(i)}</span>
            <span className="bg calNumberZindex">{formattedDate}</span>
          </Col>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <Row className="mr-0 rowStyle" key={day}>
          {days}
        </Row>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick(day) {
    this.setState({
      selectedDate: day
    });
  }

  nextMonth() {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  }

  prevMonth() {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  }

  getCalendarList() {
    fetch('/api/calendar.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          calendarList: myJson,
          sortedMeetings: this.sortMeetings(myJson)
        });
      });
  }

  deleteFromCalendarBackEnd(id) {
    fetch('/api/calendar.php', {
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        this.getCalendarList();
        this.toggle();
      });
  }

  sortMeetings(array) {
    let sortedMeetings = {
      '0': [],
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
      '6': []
    };
    for (let i = 0; i < array.length; i++) {
      switch (array[i].day) {
        case 'SUNDAY':
          sortedMeetings[0].push(array[i]);
          break;
        case 'MONDAY':
          sortedMeetings[1].push(array[i]);
          break;
        case 'TUESDAY':
          sortedMeetings[2].push(array[i]);
          break;
        case 'WEDNESDAY':
          sortedMeetings[3].push(array[i]);
          break;
        case 'THURSDAY':
          sortedMeetings[4].push(array[i]);
          break;
        case 'FRIDAY':
          sortedMeetings[5].push(array[i]);
          break;
        case 'SATURDAY':
          sortedMeetings[6].push(array[i]);
          break;
        default:
          break;
      }
    }
    return sortedMeetings;
  }

  toggle() {
    this.setState(prevState => ({
      clickedMeeting: {
        modal: !prevState.modal
      }
    }));
  }

  renderMeetings(i) {
    let numberOfIcons = this.state.sortedMeetings[i].map((meeting, input) => {
      return (
        <p key={meeting.id} onClick={() => this.setState({ clickedMeeting: { modal: true, info: meeting } })} className={`calendarInfo position${input} ${meeting.program} font-weight-bold`}>{meeting.program}<br/>{meeting.time}</p>
      );
    });
    return numberOfIcons;
  }

  titleCase(text) {
    let newWord = text.toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return newWord;
  }

  componentDidMount() {
    this.getCalendarList();
  }

  render() {
    if (this.state.calendarList !== undefined) {
      return (
        <React.Fragment>
          <NavBar />
          <div className="calendar mr-4">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
          {this.state.clickedMeeting.info !== null && this.state.clickedMeeting.info !== undefined &&
          <Modal isOpen={this.state.clickedMeeting.modal} toggle={() => this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}><span className="font-weight-bold">{this.state.clickedMeeting.info.program}<br/>{this.state.clickedMeeting.info.name}</span></ModalHeader>
            <ModalBody className="text-center">
              <p>{this.state.clickedMeeting.info.time}</p>
              <p>{this.state.clickedMeeting.info.day}</p>
              <p>{this.state.clickedMeeting.info.address}, {this.titleCase(this.state.clickedMeeting.info.city)} {this.state.clickedMeeting.info.zip}</p>
              <Col xs={{ size: 6, offset: 3 }}>
                <Button color="primary" onClick={() => this.deleteFromCalendarBackEnd(this.state.clickedMeeting.info)}>REMOVE</Button>
              </Col>
            </ModalBody>
          </Modal>
          }
        </React.Fragment>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}
