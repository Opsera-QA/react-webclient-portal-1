import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import axios from "axios";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

// TODO: Rewrite node route
function JiraPrioritySelectInput(
  {
    fieldName,
    jiraToolId,
    model,
    setModel,
    setDataFunction,
    disabled,
    visible,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [priorities, setPriorities] = useState([]);
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
    setPriorities([]);
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
      await loadPriorities(cancelSource);
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

  const loadPriorities = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraPrioritiesV2(getAccessToken, cancelSource, jiraToolId);
    const jiraPriorities = response?.data?.message;

    if (isMounted?.current === true && Array.isArray(jiraPriorities)) {
      setPriorities(jiraPriorities);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={priorities}
      setDataFunction={setDataFunction}
      busy={isLoading}
      valueField={"id"}
      textField={"name"}
      error={error}
      visible={visible}
      disabled={disabled}
    />
  );
}

JiraPrioritySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
  fieldName: PropTypes.string,
};

export default JiraPrioritySelectInput;