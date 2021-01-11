import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/SelectInputBase";

// disabling metric selection for now
export const notificationTypes = [
  {name: "Pipeline", value: "pipeline"},
  {name: "Metric", value: "metric"}
];

function NotificationTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={notificationTypes}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

NotificationTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

NotificationTypeSelectInput.defaultProps = {
  fieldName: "type"
};

export default NotificationTypeSelectInput;