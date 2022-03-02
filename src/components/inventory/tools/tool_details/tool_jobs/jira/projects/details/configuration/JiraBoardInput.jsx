import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineStepNotificationActions
  from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import axios from "axios";

// TODO: Make base
function JiraBoardInput({visible, jiraToolId, jiraProjectKey, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setBoards([]);
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
      await loadProjects(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineStepNotificationActions.getJiraBoardsWithIdV2(getAccessToken, cancelSource, jiraToolId, jiraProjectKey);

    if (Array.isArray(response?.data?.message)) {
      setBoards(response.data.message);
    }
  };


  const setJiraBoard = (selectedOption) => {
    let newDataObject = {...selectedOption};
    newDataObject.setData("jiraSprint", "");
    newDataObject.setData("jiraParentTicket", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Boards";
    }

    if (jiraToolId === "") {
      return "A Jira Tool and Project must be selected before selecting Jira Board";
    }

    if (!isLoading && jiraToolId !== "" && boards.length === 0) {
      return "No Jira Boards found for selected Jira project.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"jiraBoard"}
      dataObject={dataObject}
      setDataObject={setJiraBoard}
      selectOptions={boards}
      busy={isLoading}
      placeholderText={getPlaceholderText()}
      valueField="id"
      textField="name"
      disabled={disabled || isLoading || jiraToolId === null || boards.length === 0}
    />
  );
}

JiraBoardInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jiraToolId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraProjectKey: PropTypes.string
};

JiraBoardInput.defaultProps = {
  visible: true
};

export default JiraBoardInput;