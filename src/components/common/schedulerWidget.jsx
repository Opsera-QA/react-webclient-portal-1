import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";


const SELECT_FREQUENCIES = [
  "once", "daily", "weekly", "monthly"
];

function SchedulerWidget ({ startDate, frequency, schedule, setEditSchedule, setSchedule }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFrequency, setSelectedFrequency] = useState("once");
  //let minDate = addHours(startOfDay(new Date(), "yyyy-MM-dd', 'hh:mm a"), 1);
  let minDate = Moment().add(1, "hour").startOf("hour").toDate();
  Moment.locale("en");
  momentLocalizer();

  useEffect(() => {
    console.log(startDate);
    if (typeof(date) === "string") {
      setSelectedDate(new Date(startDate));
    }
    if (frequency.length > 0) {
      setSelectedFrequency(frequency);
    }
  }, []);


  const handleDateChange = (val) => {
    setSelectedDate(val);    
  };

  const handleFrequencyChange = (val) => {
    setSelectedFrequency(val);    
  };

  const handleSaveClick = () => {
    let schedule = {
      start_date: selectedDate.toISOString(),
      end_date: null,
      frequency: selectedFrequency
    };
    setSchedule(schedule);
  };

  const handleDeleteClick = () => {
    let schedule = {
      start_date: null,
      end_date: null,
      frequency: ""
    };
    setSchedule(schedule);
  };

  const handleCancelClick = () => {
    setEditSchedule(false);
  };

  return (
    <Row>
      <Col><DateTimePicker
        onChange={e => handleDateChange(e)}
        value={selectedDate} 
        min={minDate}
      /></Col>
      <Col>
        <DropdownList
          data={SELECT_FREQUENCIES}
          defaultValue={"once"}
          value={selectedFrequency}
          onChange={e => handleFrequencyChange(e)}
        />
      </Col>
      <Col sm={2} className="my-auto">
        <FontAwesomeIcon icon={faSave}
          className="text-muted pointer"
          onClick= {() => { handleSaveClick(); }} />
        { schedule !== null && schedule.start_date !== null ? <FontAwesomeIcon icon={faTrash}
          className="text-muted ml-3 pointer"
          onClick= {() => { handleDeleteClick(); }} /> : null }
        <FontAwesomeIcon icon={faTimes}
          className="text-muted ml-3 pointer"
          onClick= {() => { handleCancelClick(); }} />
      </Col>
    </Row>    
  );
}

SchedulerWidget.propTypes = {
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  frequency: PropTypes.string,
  schedule: PropTypes.object,
  setEditSchedule: PropTypes.func,
  setSchedule: PropTypes.func
};
export default SchedulerWidget;

