import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import LoadingIcon from "components/common/icons/LoadingIcon";

function JiraSprintNameField({ dataObject, jiraToolId, jiraBoard, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [sprintName, setSprintName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadSprintName();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSprintName = async () => {
    const jiraSprintId = dataObject.getData(fieldName);
    if (jiraToolId !== "" && jiraBoard !== "" && jiraSprintId !== "") {
      const response = await pipelineStepNotificationActions.getJiraSprints2(jiraToolId, jiraBoard, getAccessToken);
      const jiraArray = response?.data?.message;
      if (Array.isArray(jiraArray)) {
        const jiraSprint = jiraArray.find((project) => project.id === jiraSprintId);

        if (jiraSprint != null) {
          setSprintName(jiraSprint.name);
        }
      }
    }
  };

  const getProjectName = () => {
    if (isLoading) {
      return <span><LoadingIcon className={"mr-1"}/>{dataObject.getData(fieldName)}</span>;
    }

    if (sprintName) {
      return sprintName;
    }

    return `Sprint name could not be found with Key: [${dataObject.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{getProjectName()}</span>
    </FieldContainer>
  );
}

JiraSprintNameField.propTypes = {
  dataObject: PropTypes.object,
  jiraToolId: PropTypes.string,
  jiraBoard: PropTypes.string,
  fieldName: PropTypes.string
};

export default JiraSprintNameField;