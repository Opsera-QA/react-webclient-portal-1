import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import JiraPrimaryUserField from "components/common/fields/inventory/tools/jira/JiraPrimaryUserField";
import JiraSecondaryUsersField from "components/common/fields/inventory/tools/jira/JiraSecondaryUsersField";

function JiraUserFields({ dataObject, jiraToolId, jiraProjectKey, primaryUserField, secondaryUsersField }) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [jiraUsers, setJiraUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [jiraToolId, jiraProjectKey]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadJiraUsers();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadJiraUsers = async () => {
    if (jiraToolId !== "" && jiraProjectKey !== "") {
      const response = await pipelineStepNotificationActions.getJiraProjectUsers2(jiraToolId, jiraProjectKey, getAccessToken);
      const jiraArray = response?.data?.message;
      if (Array.isArray(jiraArray)) {
        setJiraUsers(jiraArray);
      }
    }
  };

  return (
    <div>
      <JiraPrimaryUserField dataObject={dataObject} fieldName={primaryUserField} jiraUsers={jiraUsers} isLoading={isLoading} />
      <JiraSecondaryUsersField dataObject={dataObject} fieldName={secondaryUsersField} jiraUsers={jiraUsers} isLoading={isLoading} />
    </div>
  );
}

JiraUserFields.propTypes = {
  dataObject: PropTypes.object,
  jiraToolId: PropTypes.string,
  jiraProjectKey: PropTypes.string,
  primaryUserField: PropTypes.string,
  secondaryUsersField: PropTypes.string,
};

export default JiraUserFields;