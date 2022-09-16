import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import jiraAction from "../../../../../insights/charts/jira/jira.action";

function JiraChangeFailureRateFilterSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
  setDataFunction,
}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const jiraProjects = model.getData('jira-projects');

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        setError(error);
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(()=>{
    if(jiraProjects){
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          setError(error);
        }
      });
    }
  },[jiraProjects]);

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
      const response = await jiraAction.getJiraChangeFailureRateFilter(
        getAccessToken,
        cancelSource,
        model
      );

      if (response?.data) {
        setProjects(response?.data?.data?.jiraChangeTypesList?.data);
      }
    
  };
  const disabled = model.getData('jira-projects') === "" || projects.length === 0;
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={projects}
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

JiraChangeFailureRateFilterSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
};

JiraChangeFailureRateFilterSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default JiraChangeFailureRateFilterSelectInput;
