import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function BoomiStepSourceControlManagementToolSelectInput({model, setModel, disabled}) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      fieldName={"gitToolId"}
      toolFriendlyName={"SCM Tool"}
      toolIdentifier={model?.getData("service")}
      model={model}
      setModel={setModel}
      valueField={"_id"}
      textField={"name"}
      placeholderText={"Select a Tool"}
      disabled={disabled}
    />
  );
}

BoomiStepSourceControlManagementToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default BoomiStepSourceControlManagementToolSelectInput;