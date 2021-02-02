import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";

function JenkinsAccountInput({ jenkinsId, visible, fieldName, dataObject, setDataObject, setDataFunction, disabled, configurationRequired}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsTools, setJenkinsTools] = useState([]);
  const [jenkinsAccounts, setJenkinsAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setJenkinsAccounts([]);
    if (jenkinsId !== "" && jenkinsId != null) {
      loadJenkinsAccounts();
    }
  }, [jenkinsId, jenkinsTools]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadTools();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async () => {
    const response = await pipelineActions.getToolsList("jenkins", getAccessToken);

    if (response && Array.isArray(response)) {
      if (configurationRequired) {
        const filteredTools = response?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0 });
        setJenkinsTools(filteredTools)
      }
      else {
        setJenkinsTools(response);
      }
    }
  };

  const loadJenkinsAccounts = () => {
    setIsLoading(true);
    const index = jenkinsTools.findIndex((x) => x.id === jenkinsId);
    const jobs = index && jenkinsTools[index]?.accounts ? jenkinsTools[index].accounts : [];
    setJenkinsAccounts(jobs);
    setIsLoading(false);
  };

  const getNoJobsMessage = () => {
    if (!isLoading && (jenkinsAccounts == null || jenkinsAccounts.length === 0 && jenkinsId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No configured Jenkins Accounts have been registered for this <span className="upper-case-first">Jenkins</span> tool.
        </div>
      )
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={jenkinsAccounts}
        busy={isLoading}
        valueField="gitCredential"
        textField="gitCredential"
        disabled={disabled || isLoading || jenkinsId === "" || jenkinsAccounts?.length === 0}
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
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  typeFilter: PropTypes.string,
  configurationRequired: PropTypes.bool
};

JenkinsAccountInput.defaultProps = {
  visible: true,
}

export default JenkinsAccountInput;