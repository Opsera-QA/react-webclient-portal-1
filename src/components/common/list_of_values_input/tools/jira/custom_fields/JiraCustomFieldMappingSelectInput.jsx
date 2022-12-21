import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import axios from "axios";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { jiraActions } from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraCustomFieldMappingSelectInput(
  {
    fieldName,
    jiraToolId,
    projectKey,
    model,
    setModel,
    disabled,
    valueField,
    textField,
  }) {

  const { getAccessToken } = useContext(AuthContext);
  const [customTagFields, setCustomTagFields] = useState([]);
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
    setCustomTagFields([]);
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
  }, [jiraToolId, projectKey]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadCustomTagFields(cancelSource);
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

  const loadCustomTagFields = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraCustomMappingFields(getAccessToken, cancelSource, jiraToolId, projectKey);
    const tagFields = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(tagFields)) {
      setCustomTagFields(tagFields);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel?.setData(fieldName, selectedOption);
    setModel({ ...newModel });
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={customTagFields}
      busy={isLoading}
      textField={textField}
      valueField={valueField}
      error={error}
      disabled={disabled}
    />
  );
}

JiraCustomFieldMappingSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string,
  projectKey: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

JiraCustomFieldMappingSelectInput.defaultProps = {
  valueField: "key",
  textField: "name",
};

export default JiraCustomFieldMappingSelectInput;
