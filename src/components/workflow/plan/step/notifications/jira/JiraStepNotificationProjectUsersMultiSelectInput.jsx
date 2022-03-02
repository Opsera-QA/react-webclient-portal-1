import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function JiraStepNotificationProjectUsersMultiSelectInput({fieldName, jiraToolId, jiraProject, visible, dataObject, setDataObject, disabled}) {
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
    <MultiSelectInputBase
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

JiraStepNotificationProjectUsersMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraProject: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

JiraStepNotificationProjectUsersMultiSelectInput.defaultProps = {
  fieldName: "jiraSecondaryAssignees",
  visible: true
};

export default JiraStepNotificationProjectUsersMultiSelectInput;