import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Calendar } from "dhx-suite-package";
import InputContainer from "components/common/inputs/InputContainer";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import InfoText from "components/common/inputs/info_text/InfoText";
import CalendarInput from "components/common/inputs/date/CalendarInput";

function ScheduleCalendarInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  updateScheduleName,
}) {
  const setDataFunction = (value) => {
    let newDataObject = {...dataObject};
    const executionDate = new Date(dataObject.getData("executionDate"));
    const time = {hours: executionDate.getHours(), minutes: executionDate.getMinutes()};
    const newExecutionDate = new Date(value.setHours(time.hours, time.minutes));

    updateScheduleName(dataObject, value);
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
  updateScheduleName: PropTypes.func,
};

export default ScheduleCalendarInput;
