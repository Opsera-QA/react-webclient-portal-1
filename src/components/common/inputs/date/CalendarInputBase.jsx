import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {Calendar} from "@opsera/dhx-suite-package";

// TODO: Add support for date ranges when that instance arises
function CalendarInputBase({ setDataFunction, data, disabled, showTimePicker, dateFormat, width }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const calendar = setUpCalendar();

    return () => {
      calendar.destructor();
    };
  }, [disabled]);

  const setUpCalendar = () => {
    let calendar = new Calendar(containerRef.current, {
      value: new Date(data),
      width: width,
      dateFormat: dateFormat,
      timePicker: showTimePicker
    });

    if (disabled) {
      calendar.disable();
    }
    else {
      calendar.events.on("Change", (value) => {
        setDataFunction(value);
      });
    }

    return calendar;
  };

  return (<div id="calendar" ref={el => (containerRef.current = el)}/>);
}

CalendarInputBase.propTypes = {
  data: PropTypes.object,
  setDataFunction: PropTypes.func,
  showTimePicker: PropTypes.bool,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.any
};

export default CalendarInputBase;