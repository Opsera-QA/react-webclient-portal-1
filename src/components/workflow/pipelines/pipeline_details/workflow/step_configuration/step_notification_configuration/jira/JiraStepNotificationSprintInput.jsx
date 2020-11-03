import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import {AuthContext} from "../../../../../../../../contexts/AuthContext";
import DtoSelectInput from "../../../../../../../common/input/dto_input/dto-select-input";
import pipelineStepNotificationActions from "../pipeline-step-notification-actions";

function JiraStepNotificationSprintInput({visible, dataObject, setDataObject, disabled, jiraToolId, jiraBoard}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [sprints, setSprints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSprints([]);
    if (jiraBoard && jiraToolId) {
      loadData();
    }
  }, [jiraBoard, jiraToolId]);

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
    const response = await pipelineStepNotificationActions.getJiraSprints(dataObject, getAccessToken);

    if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
      setSprints(response.data.message);
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Sprints";
    }

    if (jiraToolId === "" || jiraBoard === "") {
      return "A Jira Tool and Board must be selected before selecting Jira Sprint";
    }

    if (!isLoading && jiraToolId !== "" && jiraBoard !== "" && sprints.length === 0) {
      return "No Jira Sprints found for selected Jira Board.";
    }
  };

  const setJiraSprint = (selectedOption) => {
    let newDataObject = {...selectedOption};
    newDataObject.setData("jiraParentTicket", "");
    setDataObject({...newDataObject});
  };

  if (!visible) {
    return <></>;
  }

  return (
    <DtoSelectInput
      fieldName={"jiraSprint"}
      dataObject={dataObject}
      setDataObject={setJiraSprint}
      selectOptions={sprints}
      busy={isLoading}
      valueField="id"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || jiraToolId === "" || jiraBoard === "" || sprints.length === 0}
    />
  );
}

JiraStepNotificationSprintInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jiraToolId: PropTypes.string,
  jiraBoard: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

JiraStepNotificationSprintInput.defaultProps = {
  visible: true
}

export default JiraStepNotificationSprintInput;