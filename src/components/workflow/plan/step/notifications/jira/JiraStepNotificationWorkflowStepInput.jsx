import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JiraStepNotificationWorkflowStepInput({jiraToolId, jiraProject, fieldName, visible, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWorkflowSteps([]);
    if (jiraToolId && jiraProject) {
      loadData();
    }
  }, [jiraToolId, jiraProject]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadWorkflowSteps();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadWorkflowSteps = async () => {
    const response = await pipelineStepNotificationActions.getJiraWorkflowSteps(dataObject, getAccessToken);

    if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
      setWorkflowSteps(response.data.message);
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Workflow Transition Steps";
    }

    if (jiraToolId === "" || jiraProject === "") {
      return "A Jira Tool and Project must be selected before selecting Jira Workflow Transition Step";
    }

    if (!isLoading && jiraToolId !== "" && jiraProject !== "" && workflowSteps.length === 0) {
      return "No Jira Workflow Transition Steps found for selected Jira Tool and Project.";
    }
  };
  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={workflowSteps}
      busy={isLoading}
      valueField="name"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraToolId == null || jiraProject == null || workflowSteps.length === 0}
    />
  );
}

JiraStepNotificationWorkflowStepInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  fieldName: PropTypes.string,
  jiraToolId: PropTypes.string,
  jiraProject: PropTypes.string,
};

JiraStepNotificationWorkflowStepInput.defaultProps = {
  visible: true
};

export default JiraStepNotificationWorkflowStepInput;