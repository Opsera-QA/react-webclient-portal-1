import React, {useEffect, useContext, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";

function GitReviewerMultiSelectInput(
  {
    gitToolId,
    visible,
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    clearDataFunction,
    disabled,
    service,
    workspace,
    repository
  }) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allReviewers, setAllReviewers] = useState([]);
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
  }, [gitToolId]);

  // TODO: Rewrite
  useEffect(() => {
    setReviewers(
      allReviewers.filter(acc =>
        ((service === 'bitbucket' && acc.workspace === workspace && acc.repository === repository)
          || (service !== 'bitbucket' && acc.repository === repository)))
    );
  }, [workspace, repository]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getReviewers(cancelSource);
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getReviewers = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV2(getAccessToken, cancelSource, gitToolId);
    const tools = response?.data?.data;
    const accounts = Array.isArray(tools) && tools.length > 0 ? tools[0]?.accounts : undefined;

    if(Array.isArray(accounts) && accounts.length > 0){
      setAllReviewers(accounts);
      setReviewers(accounts
        .filter(acc => ((service === 'bitbucket' && acc.workspace === workspace && acc.repository === repository) || (service !== 'bitbucket' && acc.repository === repository))));
    }
  };

  const getNoReviewersMessage = () => {
    if (!isLoading && gitToolId !== "" && (!Array.isArray(allReviewers) || allReviewers.length === 0)) {
      return ("No Reviewers Assigned in Accounts for the selected tool.");
    }

    if (!isLoading && (!Array.isArray(reviewers) || reviewers.length === 0) && gitToolId !== "") {
      return ("No Reviewers found for the details provided");
    }
  };

  if (visible === false) {
    return null;
  }

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={reviewers}
      busy={isLoading}
      placeholderText={getNoReviewersMessage()}
      clearDataFunction={clearDataFunction}
      valueField="reviewerName"
      textField="reviewerName"
      disabled={disabled || isLoading || reviewers.length === 0}
    />
  );
}

GitReviewerMultiSelectInput.propTypes = {
  gitToolId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  service: PropTypes.string,
  workspace: PropTypes.string,
  repository: PropTypes.string
};

export default GitReviewerMultiSelectInput;