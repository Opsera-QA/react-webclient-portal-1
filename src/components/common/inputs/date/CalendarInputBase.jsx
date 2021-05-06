import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Calendar} from "dhx-suite-package";
import InputContainer from "components/common/inputs/InputContainer";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";
import InfoText from "components/common/inputs/info_text/InfoText";

// TODO: Add support for date ranges when that instance arises
function CalendarInputBase({ fieldName, dataObject, setDataObject, disabled, setDataFunction, showTimePicker, dateFormat }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const containerRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const calendar = setUpCalendar();

    return () => {
      calendar.destructor();
    };
  }, [dataObject, disabled]);

  const validateAndSetData = (value) => {
    let newDataObject;
    if (setDataFunction) {
      newDataObject = setDataFunction(value);
    }
    else {
      newDataObject = {...dataObject};
      newDataObject.setData(fieldName, value);
      setDataObject({...newDataObject});
    }

    setErrorMessage(newDataObject.getFieldError(fieldName));
  };

  const setUpCalendar = () => {
    let calendar = new Calendar(containerRef.current, {
      width: "75%",
      value: new Date(dataObject.getData(fieldName)),
      dateFormat: dateFormat,
      timePicker: showTimePicker
    });

    if (disabled) {
      calendar.disable();
    }
    else {
      calendar.events.on("Change", (value) => {
        validateAndSetData(value);
      });
    }

    return calendar;
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <div className={"content-container"} style={{width: "90%"}}>
        <InputTitleBar icon={faCalendar} field={field}/>
        <div id="calendar" ref={el => (containerRef.current = el)} style={{display: "flex", justifyContent: "center"}}/>
      </div>
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

CalendarInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  showTimePicker: PropTypes.bool,
  dateFormat: PropTypes.string
};

export default CalendarInputBase;