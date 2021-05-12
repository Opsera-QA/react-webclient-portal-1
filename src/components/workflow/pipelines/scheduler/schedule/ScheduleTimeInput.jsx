import React from "react";
import PropTypes from "prop-types";
import TimeInput from "components/common/inputs/time/TimeInput";


function ScheduleTimeInput({ fieldName, dataObject, setDataObject, disabled, updateScheduleName }) {
  const setDataFunction = (value) => {
    let newDataObject = {...dataObject};
    updateScheduleName();
    const hours = value.slice(0,2);
    const minutes = value.slice(3,5);
    const newDate = new Date(dataObject.getData("executionDate"));

    newDate.setHours(hours, minutes);
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
    return newDataObject;
  };

  return (
    <TimeInput
      customTitle={"Execution Time"}
      dataObject={dataObject}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

ScheduleTimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  updateScheduleName: PropTypes.func,
};

ScheduleTimeInput.defaultProps = {
  fieldName: "executionTime"
};

export default ScheduleTimeInput;