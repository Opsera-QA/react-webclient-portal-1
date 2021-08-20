import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import FieldContainer from "components/common/fields/FieldContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import FieldLabel from "components/common/fields/FieldLabel";

function JiraProjectNameField({ dataObject, jiraToolId, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadProjectName();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjectName = async () => {
    const jiraProjectKey = dataObject.getData(fieldName);
    if (jiraToolId !== "" && jiraProjectKey !== "") {
      const response = await pipelineStepNotificationActions.getJiraProjectsFromId(jiraToolId, getAccessToken);
      const jiraArray = response?.data?.message;
      if (Array.isArray(jiraArray)) {
        const jiraProject = jiraArray.find((project) => project.key === jiraProjectKey);

        if (jiraProject != null) {
          setProjectName(jiraProject.name);
        }
      }
    }
  };

  const getProjectName = () => {
    if (isLoading) {
      return <span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>{dataObject.getData(fieldName)}</span>;
    }

    if (projectName) {
      return projectName;
    }

    return `Project name could not be found with Key: [${dataObject.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{getProjectName()}</span>
    </FieldContainer>
  );
}

JiraProjectNameField.propTypes = {
  dataObject: PropTypes.object,
  jiraToolId: PropTypes.string,
  fieldName: PropTypes.string
};

export default JiraProjectNameField;