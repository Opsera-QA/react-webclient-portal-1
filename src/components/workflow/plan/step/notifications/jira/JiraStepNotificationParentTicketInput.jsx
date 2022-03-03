import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JiraStepNotificationParentTicketInput({jiraToolId, jiraSprintId, visible, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jiraTickets, setJiraTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setJiraTickets([]);
    if (jiraToolId && jiraSprintId) {
      loadData();
    }
  }, [jiraToolId, jiraSprintId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
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
    const response = await pipelineStepNotificationActions.getJiraParentTickets(dataObject, getAccessToken);
    if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
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

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"jiraParentTicket"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={jiraTickets}
      busy={isLoading}
      valueField={"ticket"}
      textField={"ticket"}
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraToolId == null || jiraSprintId == null || jiraTickets.length === 0}
    />
  );
}

JiraStepNotificationParentTicketInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
  jiraSprintId: PropTypes.string
};

JiraStepNotificationParentTicketInput.defaultProps = {
  visible: true
};

export default JiraStepNotificationParentTicketInput;