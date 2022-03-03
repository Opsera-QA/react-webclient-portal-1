import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function JiraUserInputs({jiraToolId, jiraProject, dataObject, setDataObject, disabled}) {
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
    const response = await pipelineStepNotificationActions.getJiraProjectUsers2(jiraToolId, jiraProject, getAccessToken);

    if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
      setUsers(response.data.message);
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Assignees";
    }

    if (jiraToolId === "" || jiraProject === "") {
      return "A Jira Tool and Project must be selected before selecting Jira Assignees";
    }

    if (!isLoading && jiraToolId !== "" && jiraProject !== "" && users.length === 0) {
      return "No Jira Assignees found for selected Jira Project.";
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={"jiraPrimaryAssignee"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={users}
        busy={isLoading}
        valueField="accountId"
        textField="displayName"
        placeholderText={getPlaceholderText()}
        disabled={disabled || isLoading || jiraProject == null || jiraToolId == null || users.length === 0}
      />
      <MultiSelectInputBase
        fieldName={"jiraSecondaryAssignees"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={users}
        busy={isLoading}
        valueField="accountId"
        textField="displayName"
        placeholderText={getPlaceholderText()}
        disabled={disabled || isLoading || jiraProject == null || jiraToolId == null || users.length === 0}
      />
    </>
  );
}

JiraUserInputs.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraProject: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default JiraUserInputs;