import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraBoardSelectInput(
  {
    visible,
    fieldName,
    jiraToolId,
    model,
    setModel,
    setDataFunction,
    disabled,
    jiraProjectKey,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
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
    setBoards([]);
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraProjectKey) === true) {
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
      await loadBoards(cancelSource);
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

  const loadBoards = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraBoardsV2(
      getAccessToken,
      cancelSource,
      jiraToolId,
      jiraProjectKey,
    );
    const jiraBoards = response?.data?.message;

    if (isMounted?.current === true && Array.isArray(jiraBoards)) {
      setBoards(jiraBoards);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={boards}
      busy={isLoading}
      visible={visible}
      valueField={"id"}
      textField={"name"}
      error={error}
      disabled={disabled}
    />
  );
}

JiraBoardSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  jiraToolId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraProjectKey: PropTypes.string
};

export default JiraBoardSelectInput;