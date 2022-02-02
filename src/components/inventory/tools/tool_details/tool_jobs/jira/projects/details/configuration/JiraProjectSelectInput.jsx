import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {parseError} from "components/common/helpers/error-helpers";

function JiraProjectSelectInput(
  {
    model,
    setModel,
    jiraToolId,
    visible,
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    if (isMongoDbId(jiraToolId)) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
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
        const parsedError = parseError(error);
        setErrorMessage(`Error pulling Jira Projects: ${parsedError}`);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineStepNotificationActions.getJiraProjectsFromIdV2(getAccessToken, cancelSource, jiraToolId);
    const projects = response?.data?.message;

    if (Array.isArray(projects)) {
      setProjects(projects);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    const newDataObject = {...model};
    newDataObject?.setData(fieldName, selectedOption?.key);
    newDataObject.setData("jiraSprint", "");
    newDataObject.setData("jiraParentTicket", "");
    setModel({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Projects";
    }

    if (jiraToolId === "") {
      return "A Jira Tool must be selected before selecting Jira Project";
    }

    if (!isLoading && jiraToolId !== "" && projects.length === 0) {
      return "No Jira Projects found for selected Jira Tool.";
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"jiraProject"}
      dataObject={model}
      setDataFunction={setDataFunction}
      selectOptions={projects}
      busy={isLoading}
      valueField={"key"}
      textField={"name"}
      errorMessage={errorMessage}
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraToolId == null || projects.length === 0}
    />
  );
}

JiraProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
};

export default JiraProjectSelectInput;