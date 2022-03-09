import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraProjectUserSelectInput(
  {
    jiraToolId,
    jiraProject,
    fieldName,
    visible,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setUsers([]);
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraProject) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          setError(error);
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jiraToolId, jiraProject]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadUsers(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadUsers = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraProjectUsersV2(
      getAccessToken,
      cancelSource,
      jiraToolId,
      jiraProject,
    );
    const jiraProjects = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(jiraProjects)) {
      setUsers(jiraProjects);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={users}
      busy={isLoading}
      error={error}
      valueField={"accountId"}
      textField={"displayName"}
      disabled={disabled}
      visible={visible}
    />
  );
}

JiraProjectUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraProject: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  fieldName: PropTypes.string
};

export default JiraProjectUserSelectInput;