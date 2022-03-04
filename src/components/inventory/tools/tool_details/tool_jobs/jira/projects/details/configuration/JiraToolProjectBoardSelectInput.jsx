import React from "react";
import PropTypes from "prop-types";
import JiraBoardSelectInput from "components/common/list_of_values_input/tools/jira/boards/JiraBoardSelectInput";

// TODO: Make base
function JiraToolProjectBoardSelectInput({visible, jiraToolId, jiraProjectKey, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?.id);
    newModel?.setDefaultValue("jiraSprint");
    newModel?.setDefaultValue("jiraParentTicket");
    setModel({...newModel});
  };

  return (
    <JiraBoardSelectInput
      fieldName={"jiraBoard"}
      model={model}
      setModel={setModel}
      visible={visible}
      setDataFunction={setDataFunction}
      jiraProjectKey={jiraProjectKey}
      jiraToolId={jiraToolId}
      disabled={disabled}
    />
  );
}

JiraToolProjectBoardSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  jiraToolId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraProjectKey: PropTypes.string
};

export default JiraToolProjectBoardSelectInput;