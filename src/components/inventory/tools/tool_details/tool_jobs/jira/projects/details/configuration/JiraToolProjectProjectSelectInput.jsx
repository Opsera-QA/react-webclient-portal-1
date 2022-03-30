import React from "react";
import PropTypes from "prop-types";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";

function JiraToolProjectProjectSelectInput(
  {
    model,
    setModel,
    jiraToolId,
    visible,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newDataObject = {...model};
    newDataObject?.setData(fieldName, selectedOption?.key);
    newDataObject.setDefaultValue("jiraSprint");
    newDataObject.setDefaultValue("jiraBoard");
    newDataObject.setDefaultValue("jiraParentTicket");
    setModel({...newDataObject});
  };

  return (
    <JiraProjectSelectInput
      fieldName={"jiraProject"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      jiraToolId={jiraToolId}
      visible={visible}
      disabled={disabled}
    />
  );
}

JiraToolProjectProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
};

export default JiraToolProjectProjectSelectInput;