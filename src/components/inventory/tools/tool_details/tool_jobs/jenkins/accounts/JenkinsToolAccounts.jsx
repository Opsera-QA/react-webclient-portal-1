import React, {useContext, useEffect, useRef, useState} from "react";
import JenkinsToolAccountsTable from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/JenkinsToolAccountsTable";
import PropTypes from "prop-types";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import JenkinsAccountEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/JenkinsAccountEditorPanel";
import jenkinsToolAccountActions
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccounts.actions";

function JenkinsToolAccounts({ toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [jenkinsAccountModel, setJenkinsAccountModel] = useState(undefined);
  const [jenkinsAccounts, setJenkinsAccounts] = useState([]);
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

    setJenkinsAccounts([]);
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMongoDbId(toolId)) {
        await getJenkinsAccounts(cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getJenkinsAccounts = async (cancelSource = cancelTokenSource) => {
    const response = await jenkinsToolAccountActions.getJenkinsAccountsV2(getAccessToken, cancelSource, toolId);
    const jenkinsAccountArray = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(jenkinsAccountArray)) {
      setJenkinsAccounts(jenkinsAccountArray);
    }
  };

  const closePanelFunction = async () => {
    setJenkinsAccountModel(undefined);
    await loadData();
  };

  if (jenkinsAccountModel != null) {
    return (
      <JenkinsAccountEditorPanel
        toolId={toolId}
        jenkinsAccountData={jenkinsAccountModel}
        setJenkinsAccountData={setJenkinsAccountModel}
        closePanelFunction={closePanelFunction}
      />
    );
  }

  return (
    <JenkinsToolAccountsTable
      isLoading={isLoading}
      jenkinsAccounts={jenkinsAccounts}
      toolId={toolId}
      isMounted={isMounted}
      setJenkinsAccountModel={setJenkinsAccountModel}
      loadData={loadData}
    />
  );
}

JenkinsToolAccounts.propTypes = {
  toolId: PropTypes.string,
};

export default JenkinsToolAccounts;
