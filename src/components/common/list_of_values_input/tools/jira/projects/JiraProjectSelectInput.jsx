import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

// TODO: Rewrite node route
function JiraProjectSelectInput(
  {
    fieldName,
    jiraToolId,
    visible,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
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
    setProjects([]);
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true) {
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
  }, [jiraToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadProjects(cancelSource);
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

  const loadProjects = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraProjectsV2(getAccessToken, cancelSource, jiraToolId);
    const jiraProjects = response?.data?.message;

    if (isMounted?.current === true && Array.isArray(jiraProjects)) {
      setProjects(jiraProjects);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={projects}
      busy={isLoading}
      valueField={"key"}
      textField={"name"}
      error={error}
      visible={visible}
      disabled={disabled}
    />
  );
}

JiraProjectSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
};

export default JiraProjectSelectInput;