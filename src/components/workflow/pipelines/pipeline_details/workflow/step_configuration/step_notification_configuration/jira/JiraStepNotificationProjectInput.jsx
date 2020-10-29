import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import {AuthContext} from "../../../../../../../../contexts/AuthContext";
import DtoSelectInput from "../../../../../../../common/input/dto_input/dto-select-input";
import pipelineStepNotificationActions from "../pipeline-step-notification-actions";

function JiraStepNotificationProjectInput({jiraToolId, visible, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProjects([]);
    if (jiraToolId) {
      loadData();
    }
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadProjects();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async () => {
    const response = await pipelineStepNotificationActions.getJiraProjects(dataObject, getAccessToken);
    if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
      setProjects(response.data.message);
    }
  };

  const setJiraProject = (selectedOption) => {
    let newDataObject = {...selectedOption};
    newDataObject.setData("jiraSprint", "");
    newDataObject.setData("jiraAssignee", "");
    setDataObject({...newDataObject});
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

  if (!visible) {
    return <></>;
  }

  return (
    <DtoSelectInput
      fieldName={"jiraProject"}
      dataObject={dataObject}
      setDataObject={setJiraProject}
      selectOptions={projects}
      busy={isLoading}
      valueField="id"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraToolId == null || projects.length === 0}
    />
  );
}

JiraStepNotificationProjectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string
};

JiraStepNotificationProjectInput.defaultProps = {
  visible: true
}

export default JiraStepNotificationProjectInput;