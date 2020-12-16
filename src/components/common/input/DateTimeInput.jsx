import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "../form_fields/input/InputLabel";
import InfoText from "../form_fields/input/InfoText";
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

function DateTimeInput({ fieldName, dataObject, setDataObject, disabled }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    value = value.toLowerCase();
    newDataObject.setData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  return (
    <div className="form-group m-2">
      <InputLabel field={field}/>
      <DateTimePicker
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
        defaultValue={new Date()}
        step={30}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </div>
  );
}

DateTimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default DateTimeInput;