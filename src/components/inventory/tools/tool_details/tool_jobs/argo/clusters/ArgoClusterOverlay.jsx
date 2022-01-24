import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import argoClusterMetadata from "./argo-cluster-metadata";
import ArgoClusterEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/ArgoClusterEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function ArgoClusterOverlay({ loadData, toolData, clusterData, argoDataObject, clusterId, editMode }) {

  const toastContext = useContext(DialogToastContext);
  const [argoClusterData, setArgoClusterData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initializeModel();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoDataObject]);

  const initializeModel = () => {
    let parsedModel = modelHelpers.parseObjectIntoModel(argoDataObject, argoClusterMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setArgoClusterData({...parsedModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={argoClusterMetadata.type} loadData={loadData}>
      <ArgoClusterEditorPanel
        argoClusterData={argoClusterData}
        toolData={toolData}
        loadData={loadData}
        clusterData={clusterData}
        handleClose={closePanel}
        clusterId={clusterId}
        editMode={editMode}
      />
    </CreateCenterPanel>
  );
}

ArgoClusterOverlay.propTypes = {
  toolData: PropTypes.object,
  argoDataObject: PropTypes.object,
  loadData: PropTypes.func,
  clusterData: PropTypes.array,
  clusterId: PropTypes.string,
  editMode: PropTypes.bool,
};

export default ArgoClusterOverlay;
