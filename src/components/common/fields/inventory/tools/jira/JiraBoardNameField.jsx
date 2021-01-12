import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import FieldContainer from "components/common/fields/FieldContainer";
import Label from "components/common/form_fields/Label";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function JiraBoardNameField({ dataObject, jiraToolId, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [boardName, setBoardName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadBoardName();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBoardName = async () => {
    const jiraBoardId = dataObject.getData(fieldName);
    if (jiraToolId !== "" && jiraBoardId !== "") {
      const response = await pipelineStepNotificationActions.getJiraBoardsWithId(jiraToolId, getAccessToken);
      const jiraArray = response?.data?.message;
      if (Array.isArray(jiraArray)) {
        const jiraBoard = jiraArray.find((board) => board.id === jiraBoardId);

        if (jiraBoard != null) {
          setBoardName(jiraBoard.name);
        }
      }
    }
  };

  const getBoardName = () => {
    if (isLoading) {
      return <span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>{dataObject.getData(fieldName)}</span>;
    }

    if (boardName) {
      return boardName;
    }

    return `Board name could not be found with Key: [${dataObject.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <Label field={field}/>
      <span>{getBoardName()}</span>
    </FieldContainer>
  );
}

JiraBoardNameField.propTypes = {
  dataObject: PropTypes.object,
  jiraToolId: PropTypes.string,
  fieldName: PropTypes.string
};

export default JiraBoardNameField;