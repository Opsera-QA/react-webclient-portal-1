import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/SelectInputBase";

export const notificationConditions = [
  {name: "is above", value: "above"},
  {name: "is below", value: "below"},
  {name: "equals", value: "equals"},
];

function NotificationConditionSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={notificationConditions}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

NotificationConditionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

NotificationConditionSelectInput.defaultProps = {
  fieldName: "condition"
};

export default NotificationConditionSelectInput;