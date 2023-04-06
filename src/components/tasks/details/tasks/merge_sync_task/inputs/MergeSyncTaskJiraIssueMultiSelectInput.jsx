import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {faExternalLink} from "@fortawesome/pro-light-svg-icons";
import MergeSyncTaskJiraTicketInfoOverlay from "../details/MergeSyncTaskJiraTicketInfoOverlay";

function MergeSyncTaskJiraIssueMultiSelectInput(
  {
    model,
    setModel,
    jiraToolId,
    jiraProjectKey,
    disabled,
  }) {

  const { getAccessToken } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  // const [selectedIssue, setSelectedIssue] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
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
    setIssues([]);
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && jiraProjectKey) {
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
  }, [jiraToolId, jiraProjectKey]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadIssues(cancelSource);
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

  const loadIssues = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraIssuesFromProject(getAccessToken, cancelSource, jiraToolId, jiraProjectKey);
    const jiraIssues = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(jiraIssues)) {
      setIssues(jiraIssues);
    }
  };

  // const setDataFunction = (fieldName, selectedOption) => {
  //   console.log({selectedOption});
  //   // setSelectedIssue(selectedOption);
  //   const newModel = { ...model };
  //   newModel?.setData(fieldName, selectedOption.map((option) => { return(option.key); }));
  //   setModel({ ...newModel });
  // };

  const clearDataFunction = (fieldName) => {
    // setSelectedIssue(undefined);
    const newModel = { ...model };
    newModel.setDefaultValue("jiraIssueIds");
    setModel({ ...newModel });
  };

  const formText = (item) => {    
    return (`${item.key}: ${item.summary}`);
  };

  // const getJiraIssueUrl = () => {
  //   return selectedIssue ? selectedIssue?.link : null;
  // };

  // const getInfoOverlay = () => {
  //   if (selectedIssue) {
  //     return (
  //       <MergeSyncTaskJiraTicketInfoOverlay
  //         selectedTicket={selectedIssue}          
  //       />
  //     );
  //   }
  // };

  return (
    <MultiSelectInputBase
      fieldName={"jiraIssueIds"}
      dataObject={model}
      setDataObject={setModel}
      // setDataFunction={setDataFunction}
      // clearDataFunction={clearDataFunction}
      selectOptions={issues}
      busy={isLoading}
      valueField={"key"}
      textField={formText}
      error={error}
      disabled={disabled}
      // linkTooltipText={"View Issue in Jira"}
      // linkIcon={faExternalLink}
      // detailViewLink={getJiraIssueUrl()}
      // infoOverlay={getInfoOverlay()}
      // ellipsisTooltipText={"View Selected Jira Issue Details"}
    />    
  );
}

MergeSyncTaskJiraIssueMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraToolId: PropTypes.string,
  jiraProjectKey: PropTypes.string,
};

export default MergeSyncTaskJiraIssueMultiSelectInput;
