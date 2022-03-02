import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JiraStepNotificationProjectUserInput({jiraToolId, jiraProject, fieldName, visible, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsers([]);
    if (jiraToolId && jiraProject) {
      loadData();
    }
  }, [jiraToolId, jiraProject]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadUsers();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    const response = await pipelineStepNotificationActions.getJiraProjectUsers(dataObject, getAccessToken);

    if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
      setUsers(response.data.message);
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Assignees";
    }

    if (jiraToolId === "" || jiraProject === "") {
      return "A Jira Tool and Project must be selected before selecting Jira Assignee";
    }

    if (!isLoading && jiraToolId !== "" && jiraProject !== "" && users.length === 0) {
      return "No Jira Assignees found for selected Jira Project.";
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
      selectOptions={users}
      busy={isLoading}
      valueField="accountId"
      textField="displayName"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraProject == null || jiraToolId == null || users.length === 0}
    />
  );
}

JiraStepNotificationProjectUserInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraProject: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  fieldName: PropTypes.string
};

JiraStepNotificationProjectUserInput.defaultProps = {
  visible: true,
  fieldName: "jiraPrimaryAssignee"
};

export default JiraStepNotificationProjectUserInput;