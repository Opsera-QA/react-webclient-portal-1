import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";

function JiraUserInputs({jiraToolId, jiraProject, dataObject, setDataObject, disabled}) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setUsers([]);
    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraProject) === true) {
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
    const response = await jiraActions.getJiraProjectUsersV2(
      getAccessToken,
      cancelTokenSource,
      jiraToolId,
      jiraProject,
    );
    const users = DataParsingHelper.parseNestedArray(response, "data.data");

    if (users) {
      setUsers([...users]);
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