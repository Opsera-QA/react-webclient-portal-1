import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function ServiceNowStepNotificationToolInput({visible, dataObject, setDataObject, disabled}) {
  if (!visible) {
    return <></>;
  }

  const getPlaceholderText = () => {
    if (dataObject.getData("enabled") !== true) {
      return "Notifications must be enabled before selecting ServiceNow Tool.";
    }
  };

  return (
    <PipelineToolInput
      toolType={"servicenow"}
      toolFriendlyName={"Service Now"}
      fieldName={"toolId"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={getPlaceholderText()}
      visible={visible}
      disabled={disabled || dataObject.getData("enabled") === false}
   />
  );
}

ServiceNowStepNotificationToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

ServiceNowStepNotificationToolInput.defaultProps = {
  visible: true
};

export default ServiceNowStepNotificationToolInput;