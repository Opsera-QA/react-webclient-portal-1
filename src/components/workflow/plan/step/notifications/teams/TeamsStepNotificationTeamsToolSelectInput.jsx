import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedMicrosoftTeamsToolSelectInput
  from "components/common/list_of_values_input/tools/teams/RoleRestrictedMicrosoftTeamsToolSelectInput";

function TeamsStepNotificationTeamsToolSelectInput(
  {
    visible,
    model,
    setModel,
    disabled,
  }) {
  return (
    <RoleRestrictedMicrosoftTeamsToolSelectInput
      fieldName={"toolId"}
      model={model}
      setModel={setModel}
      visible={visible}
      disabled={disabled || model?.getData("enabled") === false}
   />
  );
}

TeamsStepNotificationTeamsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default TeamsStepNotificationTeamsToolSelectInput;