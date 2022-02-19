import React  from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const notificationLevels = [
  { value: "finished", label: "Step Completed", message: "You will receive notifications on this step's completion no matter what the status.", },
  { value: "error", label: "On Error", message: "You will receive notifications on any errors in this step." },
  { value: "all", label: "All Activity", message: "You will receive notifications for any activity on this step." },
];

function NotificationLevelInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    visible,
  }) {
  const getPlaceholderText = () => {
    if (dataObject?.getData("enabled") === false) {
      return "Notifications must be enabled before selecting Notification Level.";
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={notificationLevels}
      placeholderText={getPlaceholderText()}
      valueField={"value"}
      textField={"label"}
      disabled={disabled || dataObject.getData("enabled") === false}
   />
  );
}

NotificationLevelInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default NotificationLevelInput;