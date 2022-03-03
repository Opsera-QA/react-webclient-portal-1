import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraSprintSelectInput(
  {
    visible,
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    jiraToolId,
    jiraBoard,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [sprints, setSprints] = useState([]);
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
    setSprints([]);
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraBoard) === true) {
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
  }, [jiraToolId, jiraBoard]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSprints(cancelSource);
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

  const loadSprints = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraSprintsV2(
      getAccessToken,
      cancelSource,
      jiraToolId,
      jiraBoard,
    );
    const jiraSprints = response?.data?.message;

    if (isMounted?.current === true && Array.isArray(jiraSprints)) {
      setSprints(jiraSprints);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      visible={visible}
      selectOptions={sprints}
      busy={isLoading}
      valueField={"id"}
      textField={"name"}
      disabled={disabled}
      error={error}
    />
  );
}

JiraSprintSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraBoard: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default JiraSprintSelectInput;