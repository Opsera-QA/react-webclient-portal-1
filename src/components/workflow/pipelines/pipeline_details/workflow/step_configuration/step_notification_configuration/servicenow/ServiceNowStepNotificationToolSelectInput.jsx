import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedServiceNowToolSelectInput
  from "components/common/list_of_values_input/tools/service_now/RoleRestrictedServiceNowToolSelectInput";

function ServiceNowStepNotificationToolSelectInput({visible, model, setModel, disabled}) {
  const getPlaceholderText = () => {
    if (model?.getData("enabled") !== true) {
      return "Notifications must be enabled before selecting ServiceNow Tool.";
    }
  };

  return (
    <RoleRestrictedServiceNowToolSelectInput
      toolType={"servicenow"}
      toolFriendlyName={"Service Now"}
      fieldName={"toolId"}
      model={model}
      setModel={setModel}
      placeholderText={getPlaceholderText()}
      visible={visible}
      disabled={disabled || model?.getData("enabled") === false}
   />
  );
}

ServiceNowStepNotificationToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default ServiceNowStepNotificationToolSelectInput;