import React from "react";
import PropTypes from "prop-types";
import JiraSprintTicketSelectInput
  from "components/common/list_of_values_input/tools/jira/tickets/JiraSprintTicketSelectInput";

function JiraToolProjectParentTicketSelectInput(
  {
    jiraToolId,
    jiraSprintId,
    model,
    setModel,
    disabled,
    visible,
  }) {

  return (
    <JiraSprintTicketSelectInput
      fieldName={"jiraParentTicket"}
      model={model}
      setModel={setModel}
      jiraToolId={jiraToolId}
      jiraSprintId={jiraSprintId}
      disabled={disabled}
      visible={visible}
    />
  );
}

JiraToolProjectParentTicketSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
  jiraSprintId: PropTypes.string,
};

export default JiraToolProjectParentTicketSelectInput;