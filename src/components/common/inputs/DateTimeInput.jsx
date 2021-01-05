import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/fields/input/InputLabel";
import InfoText from "components/common/fields/input/InfoText";

function DateTimeInput({ fieldName, dataObject, setDataObject, disabled }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  Moment.locale("en");
  momentLocalizer();

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer>
      <InputLabel field={field}/>
      <DateTimePicker
        disabled={disabled}
        value={new Date(dataObject.getData(fieldName))}
        onChange={(value) => validateAndSetData(value)}
        defaultValue={new Date()}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

DateTimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default DateTimeInput;