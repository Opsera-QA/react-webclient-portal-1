import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSlackToolSelectInput
  from "components/common/list_of_values_input/tools/slack/RoleRestrictedSlackToolSelectInput";

function SlackStepNotificationToolInput({visible, dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption?._id);
    newDataObject.setData("channel", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (dataObject?.getData("enabled") !== true) {
      return "Notifications must be enabled before selecting Slack Tool.";
    }
  };

  return (
    <RoleRestrictedSlackToolSelectInput
      fieldName={"toolId"}
      model={dataObject}
      setModel={setDataObject}
      setDataFunction={setDataFunction}
      placeholderText={getPlaceholderText()}
      visible={visible}
      disabled={disabled || dataObject.getData("enabled") === false}
   />
  );
}

SlackStepNotificationToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default SlackStepNotificationToolInput;