import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {NOTIFICATION_METHOD_SELECT_OPTIONS} from "components/common/list_of_values_input/notifications/method/notificationMethod.constants";

function NotificationMethodSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={NOTIFICATION_METHOD_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

NotificationMethodSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

NotificationMethodSelectInput.defaultProps = {
  fieldName: "method"
};

export default NotificationMethodSelectInput;