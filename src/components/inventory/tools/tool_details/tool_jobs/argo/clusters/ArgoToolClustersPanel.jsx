import React, {useContext, useEffect, useState, useRef} from "react";
import ArgoClusterTable from "./ArgoClusterTable";
import PropTypes from "prop-types";
import CreateArgoClusterOverlay from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/CreateArgoClusterOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import modelHelpers from "components/common/model/modelHelpers";
import argoClusterMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/argo-cluster-metadata";
import ArgoClusterEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/ArgoClusterEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

function ArgoToolClustersPanel({ toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoClusters, setArgoClusters] = useState([]);
  const [selectedArgoCluster, setSelectedArgoCluster] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {

    if(cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(cancelTokenSource).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getArgoClusters(cancelSource);
    } catch (error) {
      if(isMounted?.current === true){
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const getArgoClusters = async (cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoClustersV2(getAccessToken, cancelSource, toolId);

    const clusters = response?.data?.data;

    if(isMounted?.current === true && Array.isArray(clusters)){
      setArgoClusters(clusters);
    }
  };

  const onRowSelect = (grid, row) => {
    const clusterObject = {
      clusterName: row?.name,
      server: row?.server
    };
    const parsedModel = modelHelpers.parseObjectIntoModel(clusterObject, argoClusterMetadata);
    setSelectedArgoCluster({...parsedModel});
  };

  const closeEditorPanel = async () => {
    setSelectedArgoCluster(undefined);
    await loadData();
  };

  if (selectedArgoCluster != null) {
    return (
      <ArgoClusterEditorPanel
        argoClusterData={selectedArgoCluster}
        toolId={toolId}
        loadData={loadData}
        clusterData={argoClusters}
        handleClose={closeEditorPanel}
      />
    );
  }

  return (
    <ArgoClusterTable
      isLoading={isLoading}
      toolId={toolId}
      loadData={loadData}
      onRowSelect={onRowSelect}
      argoClusters={argoClusters}
    />
  );
}

ArgoToolClustersPanel.propTypes = {
  toolId: PropTypes.string,
};

export default ArgoToolClustersPanel;
