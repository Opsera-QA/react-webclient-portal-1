import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraProjectWorkflowStepSelectInput(
  {
    jiraToolId,
    jiraProject,
    fieldName,
    visible,
    model,
    setModel,
    disabled,
    setDataFunction,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [workflowSteps, setWorkflowSteps] = useState([]);
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
    setWorkflowSteps([]);
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
      await loadWorkflowSteps(cancelSource);
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

  const loadWorkflowSteps = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraWorkflowStepsV2(
      getAccessToken,
      cancelSource,
      jiraToolId,
      jiraProject,
    );
    const jiraWorkflowSteps = response?.data?.message;

    if (isMounted?.current === true && Array.isArray(jiraWorkflowSteps)) {
      setWorkflowSteps(jiraWorkflowSteps);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={workflowSteps}
      busy={isLoading}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      visible={visible}
      error={error}
    />
  );
}

JiraProjectWorkflowStepSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  fieldName: PropTypes.string,
  jiraToolId: PropTypes.string,
  jiraProject: PropTypes.string,
};

export default JiraProjectWorkflowStepSelectInput;