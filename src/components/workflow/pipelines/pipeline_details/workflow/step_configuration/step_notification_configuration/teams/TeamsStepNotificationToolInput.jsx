import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedMicrosoftTeamsToolSelectInput
  from "components/common/list_of_values_input/tools/teams/RoleRestrictedMicrosoftTeamsToolSelectInput";

function TeamsStepNotificationToolInput({visible, dataObject, setDataObject, disabled}) {
  const getPlaceholderText = () => {
    if (dataObject.getData("enabled") !== true) {
      return "Notifications must be enabled before selecting Microsoft Teams Tool.";
    }
  };

  return (
    <RoleRestrictedMicrosoftTeamsToolSelectInput
      fieldName={"toolId"}
      model={dataObject}
      setModel={setDataObject}
      placeholderText={getPlaceholderText()}
      visible={visible}
      disabled={disabled || dataObject?.getData("enabled") === false}
   />
  );
}

TeamsStepNotificationToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

TeamsStepNotificationToolInput.defaultProps = {
  visible: true
};

export default TeamsStepNotificationToolInput;