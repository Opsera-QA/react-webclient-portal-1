import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function JiraStepNotificationToolInput({visible, dataObject, setDataObject, disabled}) {
  const setJiraTool = (selectedOption) => {
    let newDataObject = {...selectedOption};
    newDataObject.setData("jiraProject", "");
    newDataObject.setData("jiraSprint", "");
    newDataObject.setData("jiraParentTicket", "");
    newDataObject.setData("jiraAssignees", []);
    newDataObject.setData("jiraBoard", "");
    newDataObject.setData("jiraPriority", "");
    newDataObject.setData("jiraOpenStep", "");
    newDataObject.setData("jiraClosureStep", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (dataObject.getData("enabled") !== true) {
      return "Notifications must be enabled before selecting Jira Tool.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <PipelineToolInput
      toolType={"jira"}
      toolFriendlyName={"Jira"}
      fieldName={"jiraToolId"}
      dataObject={dataObject}
      setDataObject={setJiraTool}
      placeholderText={getPlaceholderText()}
      visible={visible}
      disabled={disabled || dataObject.getData("enabled") === false}
   />
  );
}

JiraStepNotificationToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

JiraStepNotificationToolInput.defaultProps = {
  visible: true
};

export default JiraStepNotificationToolInput;