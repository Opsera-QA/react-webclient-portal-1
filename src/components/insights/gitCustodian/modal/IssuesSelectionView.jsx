import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import CreateJiraTicketIssuesList from "./inputs/CreateJiraTicketIssuesList";
import chartsActions from "../../charts/charts-actions";

const IssuesSelectionView = ({
  model,
  setModel,
  gitCustodianData
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState("");  
  const [issuesData, setIssuesData] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const dataResponse = await chartsActions.exportGitCustodianData(getAccessToken, cancelSource, gitCustodianData);
      const issuesArr = dataResponse?.data?.data?.data;
      if (Array.isArray(issuesArr)) {
        setIssuesData(issuesArr);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <LoadingDialog
        size={"md"}
        message={"Loading Data"}
      />
    );
  }

  return (
    <CreateJiraTicketIssuesList
      model={model}
      setModel={setModel}
      loadDataFunction={loadData}
      issuesList={issuesData}
      isLoading={isLoading}
    />
  );
};

IssuesSelectionView.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,  
  gitCustodianData: PropTypes.object,  
};

export default IssuesSelectionView;
