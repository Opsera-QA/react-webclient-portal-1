import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";
import JiraPriorityInput
  from "components/notifications/notification_details/notification_method_forms/jira/JiraPriorityInput";
import JiraToolProjectInput
  from "components/notifications/notification_details/notification_method_forms/jira/JiraToolProjectInput";

function JiraInput({dataObject, setDataObject, disabled}) {
  const setJiraTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("jiraToolId", selectedOption["id"]);
    newDataObject.setData("toolProjectId", "");
    newDataObject.setData("jiraPrimaryAssignee", "");
    newDataObject.setData("jiraSecondaryAssignees", []);
    setDataObject({...newDataObject});
  };

  return (
    <>
      <PipelineToolInput
        toolType={"jira"}
        toolFriendlyName={"Jira"}
        fieldName={"jiraToolId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setJiraTool}
        disabled={disabled || dataObject.getData("enabled") === false}
      />
      <JiraPriorityInput dataObject={dataObject} setDataObject={setDataObject} jiraToolId={dataObject.getData("jiraToolId")} />
      <JiraToolProjectInput dataObject={dataObject} setDataObject={setDataObject} jiraToolId={dataObject.getData("jiraToolId")} />
    </>
  );
}

JiraInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JiraInput;