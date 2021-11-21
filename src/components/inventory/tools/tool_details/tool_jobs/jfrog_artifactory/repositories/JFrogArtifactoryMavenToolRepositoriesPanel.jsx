import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import JFrogMavenRepositoriesTable from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/JFrogMavenRepositoriesTable";
import axios from "axios";
import jFrogToolRepositoriesActions
  from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jFrogToolRepositories.actions";
import {AuthContext} from "contexts/AuthContext";
import ErrorBanner from "components/common/status_notifications/banners/ErrorBanner";
import {DialogToastContext} from "contexts/DialogToastContext";

function JFrogArtifactoryMavenToolRepositoriesPanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [jfrogArtifactoryMavenRepositories, setJfrogArtifactoryMavenRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect (() => {
    if(cancelTokenSource){
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if(isMounted?.current === true){
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
      const response = await jFrogToolRepositoriesActions.getMavenRepositories(getAccessToken, cancelSource, toolData.getData("_id"));

      if(response.status === 200) {
        setJfrogArtifactoryMavenRepositories(response.data);
      }

    } catch (error) {
      if(isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <JFrogMavenRepositoriesTable
        jfrogArtifactoryMavenRepositories={jfrogArtifactoryMavenRepositories}
        loadData={loadData}
        isLoading={isLoading}
        toolData={toolData}
      />
    </div>
  );
}

JFrogArtifactoryMavenToolRepositoriesPanel.propTypes = {
  toolData: PropTypes.object,
};

export default JFrogArtifactoryMavenToolRepositoriesPanel;
