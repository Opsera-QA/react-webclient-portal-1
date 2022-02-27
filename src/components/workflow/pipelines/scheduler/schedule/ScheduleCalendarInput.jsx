import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CalendarInput from "components/common/inputs/date/CalendarInput";

function ScheduleCalendarInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
}) {
  const setDataFunction = (value) => {
    let newDataObject = {...dataObject};
    const executionDate = new Date(dataObject.getData("executionDate"));
    const time = {hours: executionDate.getHours(), minutes: executionDate.getMinutes()};
    const newExecutionDate = new Date(value.setHours(time.hours, time.minutes));

    newDataObject.setData(fieldName, newExecutionDate);
    setDataObject({...newDataObject});

    return newDataObject;
  };

  return (
    <CalendarInput
      width={"100%"}
      setDataFunction={setDataFunction}
      disabled={disabled}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
    />
  );
}

ScheduleCalendarInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  showTimePicker: PropTypes.bool,
  dateFormat: PropTypes.string,
};

export default ScheduleCalendarInput;
