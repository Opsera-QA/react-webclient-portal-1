import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

function DateInput({ fieldName, dataObject, setDataObject, disabled }) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    // cut off time value from date
    const dateWithoutTime = new Date(value).toISOString().split('T')[0];
    newDataObject.setData(fieldName, dateWithoutTime);
    setDataObject({...newDataObject});
    return newDataObject;
  };

  return (
    <DateTimeInputBase
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
      showTime={false}
    />
  );
}

DateInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DateInput;