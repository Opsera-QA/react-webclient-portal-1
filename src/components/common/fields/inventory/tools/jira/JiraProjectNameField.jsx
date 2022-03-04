import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraProjectNameField(
  {
    model,
    jiraToolId,
    jiraProjectKey,
    fieldName,
  }) {
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

    if (isMongoDbId(jiraToolId) && hasStringValue(jiraProjectKey) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jiraToolId, jiraProjectKey]);

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
    const response = await jiraActions.getJiraProjectsV2(getAccessToken, cancelSource, jiraToolId);
    const jiraProjects = response?.data?.data;

    if (Array.isArray(jiraProjects)) {
      const jiraProject = jiraProjects.find((project) => project.key === jiraProjectKey);

      if (jiraProject != null) {
        setProjectName(jiraProject.name);
      }
    }
  };

  const getProjectName = () => {
    if (jiraProjectKey == null) {
      return "";
    }

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
  fieldName: PropTypes.string,
  jiraProjectKey: PropTypes.string,
};

export default JiraProjectNameField;