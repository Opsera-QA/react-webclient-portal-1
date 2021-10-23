import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import JenkinsJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsJobSelectInput";

// TODO: Refactor
function JenkinsAccountInput(
  {
    jenkinsId,
    visible,
    fieldName,
    placeholderText,
    dataObject,
    setDataObject,
    setDataFunction,
    clearDataFunction,
    disabled,
    configurationRequired,
    className,
    textField,
    valueField,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsTools, setJenkinsTools] = useState([]);
  const [jenkinsAccounts, setJenkinsAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    setJenkinsAccounts([]);

    if (jenkinsId !== "" && jenkinsId != null) {
      loadJenkinsAccounts();
    }
  }, [jenkinsId, jenkinsTools]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTools(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog("Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getToolsListV2(getAccessToken, cancelSource, "jenkins");

    if (isMounted?.current === true && response?.data) {
      let tools = [];
      let toolsResponseData = response.data;
      toolsResponseData.map((item) => {
        tools.push({
          name: item.name,
          id: item._id,
          configuration: item.configuration,
          accounts: item.accounts,
          jobs: item.jobs,
        });
      });

      if (tools) {
        if (configurationRequired) {
          const filteredTools = tools?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0; });
          setJenkinsTools(filteredTools);
        }
        else {
          setJenkinsTools(tools);
        }
      }
    }
  };

  const loadJenkinsAccounts = () => {
    setIsLoading(true);
    const index = jenkinsTools.findIndex((x) => x.id === jenkinsId);

    if (isMounted?.current === true && index !== -1) {
      const jobs = jenkinsTools[index]?.accounts ? jenkinsTools[index].accounts : [];
      setJenkinsAccounts(jobs);
      setIsLoading(false);
    }
  };

  const getNoJobsMessage = () => {
    if (!isLoading && (jenkinsAccounts == null || jenkinsAccounts.length === 0 && jenkinsId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No configured Jenkins Accounts have been registered for this <span className="upper-case-first">Jenkins</span> tool.
        </div>
      );
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <div className={className}>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={jenkinsAccounts}
        busy={isLoading}
        placeholderText={placeholderText}
        valueField={valueField}
        textField={textField}
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading || jenkinsId === ""}
      />
      {getNoJobsMessage()}
    </div>
  );
}

JenkinsAccountInput.propTypes = {
  jenkinsId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  placeholderText: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  typeFilter: PropTypes.string,
  configurationRequired: PropTypes.bool,
  className: PropTypes.string,
  clearDataFunction: PropTypes.func,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

JenkinsAccountInput.defaultProps = {
  textField: "gitCredential",
  valueField: "gitCredential",
};

export default JenkinsAccountInput;