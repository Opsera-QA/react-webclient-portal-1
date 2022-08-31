import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function GChatStepNotificationToolSelectInput(
  {
    visible,
    model,
    setModel,
    disabled,
  }) {
  return (
   <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"gchat"}
      toolFriendlyName={"Google Chat"}
      fieldName={"toolId"}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      disabled={disabled || model?.getData("enabled") === false}
    />
  );
}

GChatStepNotificationToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default GChatStepNotificationToolSelectInput;
