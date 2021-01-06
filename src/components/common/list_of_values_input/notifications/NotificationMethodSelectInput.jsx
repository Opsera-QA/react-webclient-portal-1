import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/SelectInputBase";

export const notificationMethods = [
  {name: "Email", value: "email"},
  {name: "Slack", value: "slack"},
  {name: "Jira", value: "jira"},
  {name: "Teams", value: "teams"},
];

function NotificationMethodSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={notificationMethods}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

NotificationMethodSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

NotificationMethodSelectInput.defaultProps = {
  fieldName: "method"
};

export default NotificationMethodSelectInput;