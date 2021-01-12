import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import SelectInputBase from "components/common/inputs/SelectInputBase";

function JiraParentTicketInput({jiraToolId, fieldName, jiraSprintId, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jiraTickets, setJiraTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setJiraTickets([]);
    if (jiraToolId !== "" && jiraSprintId !== "") {
      loadData();
    }
  }, [jiraToolId, jiraSprintId]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadParentTickets();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadParentTickets = async () => {
    const response = await pipelineStepNotificationActions.getJiraParentTickets2(jiraToolId, jiraSprintId, getAccessToken);
    if (Array.isArray(response?.data?.message)) {
      createDropdownItems(response.data.message);
    }
  };

  const createDropdownItems = (tickets) => {
    let mappedTickets = [];

    tickets.map((item, index) => {
      mappedTickets.push({ticket: item, id: index});
    });

    setJiraTickets(mappedTickets);
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Parent Tickets";
    }

    if (jiraToolId === "" || jiraSprintId === "") {
      return "A Jira Tool and Sprint must be selected before selecting Jira Parent Ticket";
    }

    if (!isLoading && jiraToolId !== "" && jiraTickets.length === 0) {
      return "No Jira Tickets found for selected Jira Sprint.";
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={jiraTickets}
      busy={isLoading}
      valueField={"ticket"}
      textField={"ticket"}
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraToolId === "" || jiraSprintId === "" || jiraTickets.length === 0}
    />
  );
}

JiraParentTicketInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
  jiraSprintId: PropTypes.string
};

JiraParentTicketInput.defaultProps = {
  fieldName: "jiraParentTicket"
};

export default JiraParentTicketInput;