import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import axios from "axios";
import LoadingIcon from "components/common/icons/LoadingIcon";

function JiraBoardNameField({ dataObject, jiraToolId, fieldName, jiraProjectKey }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [boardName, setBoardName] = useState("");
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

    if (jiraToolId != null && jiraToolId !== "" && jiraProjectKey != null && jiraProjectKey !== "") {
      loadData(source);
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jiraToolId, jiraProjectKey]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadBoardName(cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadBoardName = async (cancelSource = cancelTokenSource) => {
    const jiraBoardId = dataObject.getData(fieldName);
    if (jiraToolId !== "" && jiraBoardId !== "" && jiraProjectKey !== "") {
      const response = await pipelineStepNotificationActions.getJiraBoardsWithIdV2(getAccessToken, cancelSource, jiraToolId, jiraProjectKey);
      const jiraArray = response?.data?.message;
      if (Array.isArray(jiraArray)) {
        const jiraBoard = jiraArray.find((board) => board.id === jiraBoardId);

        if (isMounted?.current === true && jiraBoard != null) {
          setBoardName(jiraBoard.name);
        }
      }
    }
  };

  const getBoardName = () => {
    if (isLoading) {
      return <span><LoadingIcon className={"mr-1"}/>{dataObject.getData(fieldName)}</span>;
    }

    if (boardName) {
      return boardName;
    }

    return `Board name could not be found with Key: [${dataObject.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{getBoardName()}</span>
    </FieldContainer>
  );
}

JiraBoardNameField.propTypes = {
  dataObject: PropTypes.object,
  jiraToolId: PropTypes.string,
  fieldName: PropTypes.string,
  jiraProjectKey: PropTypes.string
};

export default JiraBoardNameField;