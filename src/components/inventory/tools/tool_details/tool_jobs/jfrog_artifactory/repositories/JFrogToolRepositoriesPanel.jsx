import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import JFrogToolRepositoryTable from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/JFrogToolRepositoryTable";
import axios from "axios";
import jFrogToolRepositoriesActions
  from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jFrogToolRepositories.actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import JFrogToolRepositoryEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/details/JFrogRepositoryEditorPanel";

function JFrogToolRepositoriesPanel({ toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [jfrogArtifactoryMavenRepositories, setJfrogArtifactoryMavenRepositories] = useState([]);
  const [jFrogRepositoryModel, setJfrogRepositoryModel] = useState(undefined);
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

    setJfrogArtifactoryMavenRepositories([]);
    loadData(source).catch((error) => {
      if(isMounted?.current === true){
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
      const response = await jFrogToolRepositoriesActions.getAllMavenRepositories(getAccessToken, cancelSource, toolId);
      const repositories = response?.data?.data;

      if(Array.isArray(repositories)) {
        setJfrogArtifactoryMavenRepositories(repositories);
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

  const togglePanel = async () => {
    setJfrogRepositoryModel(null);
    await loadData();
  };

  if (jFrogRepositoryModel) {
    return (
      <JFrogToolRepositoryEditorPanel
        toolId={toolId}
        jFrogRepositoryModel={jFrogRepositoryModel}
        setJFrogRepositoryModel={setJfrogRepositoryModel}
        loadData={loadData}
        handleClose={togglePanel}
        setJfrogRepositoryModel={setJfrogRepositoryModel}
      />
    );
  }

  return (
    <JFrogToolRepositoryTable
      jfrogArtifactoryMavenRepositories={jfrogArtifactoryMavenRepositories}
      loadData={loadData}
      isLoading={isLoading}
      toolId={toolId}
      isMounted={isMounted}
      setJfrogRepositoryModel={setJfrogRepositoryModel}
    />
  );
}

JFrogToolRepositoriesPanel.propTypes = {
  toolId: PropTypes.string,
};

export default JFrogToolRepositoriesPanel;
