import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function SlackStepNotificationToolInput({visible, dataObject, setDataObject, disabled}) {
  const setJiraTool = (selectedOption) => {
    let newDataObject = {...selectedOption};
    newDataObject.setData("channel", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (dataObject.getData("enabled") !== true) {
      return "Notifications must be enabled before selecting Slack Tool.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <PipelineToolInput
      toolType={"slack"}
      toolFriendlyName={"Slack"}
      fieldName={"toolId"}
      dataObject={dataObject}
      setDataObject={setJiraTool}
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

SlackStepNotificationToolInput.defaultProps = {
  visible: true
}

export default SlackStepNotificationToolInput;