import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";
import InfoText from "components/common/inputs/info_text/InfoText";
import CalendarInputBase from "components/common/inputs/date/CalendarInputBase";

// TODO: Add support for date ranges when that instance arises
function CalendarInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction, showTimePicker, dateFormat, width, customTitle }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

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

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={"h-100 my-2"}>
      <div
        className={"content-container h-100"}
        style={{width: width + 2}}
      >
        <InputTitleBar icon={faCalendar} field={field} customTitle={customTitle} />
        <CalendarInputBase
          showTimePicker={showTimePicker}
          data={dataObject.getData(fieldName)}
          disabled={disabled}
          setDataFunction={validateAndSetData}
          dateFormat={dateFormat}
          width={width}
        />
      </div>
      <InfoText
        model={dataObject}
        field={field}
        errorMessage={errorMessage}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

CalendarInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  showTimePicker: PropTypes.bool,
  dateFormat: PropTypes.string,
  width: PropTypes.any,
  customTitle: PropTypes.func
};

CalendarInput.defaultProps = {
  width: 250
};

export default CalendarInput;