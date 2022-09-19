import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import jiraAction from "../../../../../insights/charts/jira/jira.action";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JiraProjectSingleSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
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
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        setError(error);
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

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

  const setDataFunction = (fieldName, value) => {
    model.setData('jira-change-types',[]);
    const parsedValue = value[valueField];
    model?.setData(fieldName, parsedValue);
    setModel({...model});
  };

  const loadProjects = async (cancelSource = cancelTokenSource) => {
    const response = await jiraAction.getJiraProjects(
      getAccessToken,
      cancelSource,
    );
    if (response.data != null) {
      setProjects(response?.data?.data?.jiraProjectList?.data);
    }
  };
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={projects}
      setDataFunction={setDataFunction}
     // clearDataFunction={clearDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled}
    />
    
  );
}

JiraProjectSingleSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

JiraProjectSingleSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default JiraProjectSingleSelectInput;
