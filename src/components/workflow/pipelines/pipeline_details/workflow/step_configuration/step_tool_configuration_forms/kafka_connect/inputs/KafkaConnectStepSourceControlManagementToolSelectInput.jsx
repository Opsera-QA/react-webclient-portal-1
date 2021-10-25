import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function KafkaConnectStepSourceControlManagementToolSelectInput({model, setModel, disabled}) {
  return (
     <RoleRestrictedToolByIdentifierInputBase
       fieldName={"gitToolId"}
       toolFriendlyName={"gitToolId"}
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

KafkaConnectStepSourceControlManagementToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default KafkaConnectStepSourceControlManagementToolSelectInput;