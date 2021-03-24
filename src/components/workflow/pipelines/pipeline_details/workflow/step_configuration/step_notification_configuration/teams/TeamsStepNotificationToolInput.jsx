import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function TeamsStepNotificationToolInput({visible, dataObject, setDataObject, disabled}) {
  if (!visible) {
    return <></>;
  }

  const getPlaceholderText = () => {
    if (dataObject.getData("enabled") !== true) {
      return "Notifications must be enabled before selecting Microsoft Teams Tool.";
    }
  };

  return (
    <PipelineToolInput
      toolType={"teams"}
      toolFriendlyName={"Microsoft Teams"}
      fieldName={"toolId"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={getPlaceholderText()}
      visible={visible}
      disabled={disabled || dataObject.getData("enabled") === false}
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