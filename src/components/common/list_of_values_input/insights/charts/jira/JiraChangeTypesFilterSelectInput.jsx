import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import jiraAction from "../../../../../insights/charts/jira/jira.action";

function JiraChangeTypesFilterSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
  project
}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const { getAccessToken } = useContext(AuthContext);
  const [changeTypes, setChangeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    setChangeTypes([]);
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        setError(error);
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [project]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadProjects(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadProjects = async (cancelSource = cancelTokenSource) => {
    const response = await jiraAction.getJiraChangeTypes(
      getAccessToken,
      cancelSource,
      project
    );
    if (response.data != null) {
      setChangeTypes(response?.data?.data?.jiraChangeTypesList?.data);
    }
  };
  const disabled = model.getArrayData('jira-projects').length === 0;
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={changeTypes}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
      pluralTopic={"Filters"}
    />
  );
}

JiraChangeTypesFilterSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
  project: PropTypes.string
};

JiraChangeTypesFilterSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default JiraChangeTypesFilterSelectInput;
