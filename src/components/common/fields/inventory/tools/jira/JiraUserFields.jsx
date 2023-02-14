import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import JiraPrimaryUserField from "components/common/fields/inventory/tools/jira/JiraPrimaryUserField";
import JiraSecondaryUsersField from "components/common/fields/inventory/tools/jira/JiraSecondaryUsersField";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function JiraUserFields(
  {
    dataObject,
    jiraToolId,
    jiraProjectKey,
    primaryUserField,
    secondaryUsersField,
  }) {
  const [jiraUsers, setJiraUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraProjectKey) === true) {
      loadData();
    }
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
      const response = await jiraActions.getJiraProjectUsersV2(
        getAccessToken,
        cancelTokenSource,
        jiraToolId,
        jiraProjectKey,
      );
      const users = DataParsingHelper.parseNestedArray(response, "data.data");
      if (Array.isArray(users)) {
        setJiraUsers(users);
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