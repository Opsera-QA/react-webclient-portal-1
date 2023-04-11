import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function MergeSyncTaskJiraIssueMultiSelectInput(
  {
    model,
    setModel,
    jiraToolId,
    jiraProjectKey,
    disabled,
  }) {

  const { getAccessToken } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
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
    setIssues([]);
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && jiraProjectKey) {
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
  }, [jiraToolId, jiraProjectKey]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadIssues(cancelSource);
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

  const loadIssues = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraIssuesFromProject(getAccessToken, cancelSource, jiraToolId, jiraProjectKey);
    const jiraIssues = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(jiraIssues)) {
      setIssues(jiraIssues);
    }
  };

  const formText = (item) => {    
    return (`${item.key}: ${item.summary}`);
  };

  return (
    <MultiSelectInputBase
      fieldName={"jiraIssueIds"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={issues}
      busy={isLoading}
      valueField={"key"}
      textField={formText}
      error={error}
      disabled={disabled}
    />    
  );
}

MergeSyncTaskJiraIssueMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string,
  jiraProjectKey: PropTypes.string,
};

export default MergeSyncTaskJiraIssueMultiSelectInput;
