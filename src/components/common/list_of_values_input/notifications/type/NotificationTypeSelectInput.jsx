import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {NOTIFICATION_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/notifications/type/notificationTypes.constants";

// TODO: Remove the disabled items from here when done
function NotificationTypeSelectInput(
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
      selectOptions={NOTIFICATION_TYPE_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      valueField={"value"}
      textField={"text"}
      disabled={[{text: "Metric", value: "metric"}]}
    />
  );
}

NotificationTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

NotificationTypeSelectInput.defaultProps = {
  fieldName: "type"
};

export default NotificationTypeSelectInput;