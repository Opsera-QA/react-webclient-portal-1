import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JiraStepNotificationPriorityInput({visible, jiraToolId, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [priorities, setPriorities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPriorities([]);
    if (jiraToolId) {
      loadData();
    }
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadPriorities();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadPriorities = async () => {
    const response = await pipelineStepNotificationActions.getJiraPriorities(dataObject, getAccessToken);

    if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
      setPriorities(response.data.message);
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Priorities";
    }

    if (jiraToolId === "") {
      return "A Jira Tool must be selected before selecting Jira Priority.";
    }

    if (!isLoading && jiraToolId !== "" && priorities.length === 0) {
      return "No Jira Priorities found for selected Jira Tool.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"jiraPriority"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={priorities}
      busy={isLoading}
      valueField="id"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraToolId == null || priorities.length === 0}
    />
  );
}

JiraStepNotificationPriorityInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string
};

JiraStepNotificationPriorityInput.defaultProps = {
  visible: true
};

export default JiraStepNotificationPriorityInput;