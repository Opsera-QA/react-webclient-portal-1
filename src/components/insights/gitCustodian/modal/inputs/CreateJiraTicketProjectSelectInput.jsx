import React, { useState } from "react";
import PropTypes from "prop-types";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function CreateJiraTicketProjectSelectInput(
  {
    jiraToolId,
    model,
    setModel,
    disabled,
  }) {

  const [issueTypes, setIssueTypes] = useState([]);

  const setDataFunction = (fieldName, selectedOption) => {
    setIssueTypes(selectedOption.issuetypes.filter(issue => !issue.subtask));
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.key);
    newModel.setDefaultValue("issueTypeId");
    setModel({...newModel});
  };

  return (
    <>
      <JiraProjectSelectInput
        fieldName={"projectKey"}
        jiraToolId={jiraToolId}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        disabled={disabled}
      />
      <SelectInputBase
        fieldName={"issueTypeId"}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={issueTypes}        
        valueField={"id"}
        textField={"name"}
        disabled={issueTypes.length === 0}
      />
    </>    
  );
}

CreateJiraTicketProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string
};

export default CreateJiraTicketProjectSelectInput;
