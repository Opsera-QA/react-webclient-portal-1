import React  from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

// TODO: Make constants, wire up message field
const notificationLevels = [
  { value: "finished", text: "Step Completed", message: "You will receive notifications on this step's completion no matter what the status.", },
  { value: "error", text: "On Error", message: "You will receive notifications on any errors in this step." },
  { value: "all", text: "All Activity", message: "You will receive notifications for any activity on this step." },
];

function OrchestrationNotificationLevelSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    visible,
  }) {
  const getInfoText = () => {
    if (model?.getData("enabled") === false) {
      return "Notifications must be enabled before selecting Notification Level.";
    }

    const value = model?.getData(fieldName);
    const notificationLevel = notificationLevels?.find((notificationLevel) => notificationLevel?.value === value);

    if (hasStringValue(notificationLevel?.message) === true) {
      return notificationLevel?.message;
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={notificationLevels}
        valueField={"value"}
        textField={"text"}
        disabled={disabled || model?.getData("enabled") === false}
     />
      {/*<InfoText customMessage={getInfoText()} />*/}
    </div>
  );
}

OrchestrationNotificationLevelSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

OrchestrationNotificationLevelSelectInput.defaultProps = {
  fieldName: "event",
};

export default OrchestrationNotificationLevelSelectInput;