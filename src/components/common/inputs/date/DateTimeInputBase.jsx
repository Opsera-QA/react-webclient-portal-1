import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

function DateTimeInputBase({ fieldName, dataObject, setDataObject, setDataFunction, disabled, showDate, showTime, minDate, maxDate }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  Moment.locale("en");
  momentLocalizer();

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

  return (
    <InputContainer>
      <InputLabel field={field}/>
      <DateTimePicker
        date={showDate}
        min={minDate}
        max={maxDate}
        time={showTime}
        disabled={disabled}
        value={new Date(dataObject.getData(fieldName))}
        onChange={(value) => validateAndSetData(value)}
        defaultValue={new Date()}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

DateTimeInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showDate: PropTypes.bool,
  showTime: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any
};

DateTimeInputBase.defaultProps = {
  showDate: true,
  showTime: true
};

export default DateTimeInputBase;