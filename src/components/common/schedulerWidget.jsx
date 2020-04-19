import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSave, faTimes } from "@fortawesome/free-solid-svg-icons";


const SELECT_FREQUENCIES = [
  "once", "daily", "weekly", "monthly"
];

function SchedulerWidget ({ date, frequency, setEditSchedule, setSchedule }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFrequency, setSelectedFrequency] = useState("once");
  let minDate = Moment().add(1, "hour").startOf("hour").toDate();
  Moment.locale("en");
  momentLocalizer();

  useEffect(() => {
    console.log(typeof(date));
    if (typeof(date) === "string") {
      setSelectedDate(new Date(date));
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
        <FontAwesomeIcon icon={faTimes}
          className="text-muted ml-3 pointer"
          onClick= {() => { handleCancelClick(); }} />
      </Col>
    </Row>    
  );
}

SchedulerWidget.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  frequency: PropTypes.string,
  setEditSchedule: PropTypes.func,
  setSchedule: PropTypes.func
};
export default SchedulerWidget;

