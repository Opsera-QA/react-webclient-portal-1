import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import LoadingIcon from "components/common/icons/LoadingIcon";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraSprintNameField(
  {
    model,
    jiraToolId,
    jiraBoard,
    jiraSprintId,
    fieldName,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const {getAccessToken} = useContext(AuthContext);
  const [sprintName, setSprintName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    setSprintName("");
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraBoard) === true && hasStringValue(jiraSprintId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          setError(error);
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jiraToolId, jiraBoard, jiraSprintId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSprintName(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadSprintName = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraSprintsWithBoardIdV2(
      getAccessToken,
      cancelSource,
      jiraToolId,
      jiraBoard,
    );
    const jiraSprints = response?.data?.data;

    if (Array.isArray(jiraSprints)) {
      const jiraSprint = jiraSprints.find((project) => project.id === jiraSprintId);
      const sprintName = jiraSprint?.name;

      if (isMounted?.current === true && hasStringValue(sprintName) === true) {
        setSprintName(jiraSprint.name);
      }
    }
  };

  const getProjectName = () => {
    if (jiraSprintId == null) {
      return "";
    }

    if (isLoading) {
      return <span><LoadingIcon className={"mr-1"}/>{model?.getData(fieldName)}</span>;
    }

    if (sprintName) {
      return sprintName;
    }

    return `Sprint name could not be found with Key: [${model?.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{getProjectName()}</span>
    </FieldContainer>
  );
}

JiraSprintNameField.propTypes = {
  model: PropTypes.object,
  jiraToolId: PropTypes.string,
  jiraBoard: PropTypes.string,
  fieldName: PropTypes.string,
  jiraSprintId: PropTypes.string,
};

export default JiraSprintNameField;