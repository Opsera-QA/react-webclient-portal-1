import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";

function JiraProjectNameField({ model, jiraToolId, fieldName }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jiraToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadProjectName(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadProjectName = async (cancelSource = cancelTokenSource) => {
    const jiraProjectKey = model?.getData(fieldName);
    if (isMongoDbId(jiraToolId) && hasStringValue(jiraProjectKey) === true) {
      const response = await pipelineStepNotificationActions.getJiraProjectsFromIdV2(getAccessToken, cancelSource, jiraToolId);
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
    if (hasStringValue(projectName)) {
      return projectName;
    }

    return `Project name could not be found with Key: [${model?.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>
        <IconBase
        isLoading={isLoading}
        className={"mr-1"}
        />
        {getProjectName()}
      </span>
    </FieldContainer>
  );
}

JiraProjectNameField.propTypes = {
  model: PropTypes.object,
  jiraToolId: PropTypes.string,
  fieldName: PropTypes.string
};

export default JiraProjectNameField;