import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import argoRepositoryMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-repository-metadata";
import ArgoRepositoryEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/ArgoRepositoryEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function ArgoRepositoryOverlay({ loadData, toolData, argoDataObject, repoId }) {
  const toastContext = useContext(DialogToastContext);
  const [argoRepositoryData, setArgoRepositoryData] = useState(undefined);
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
    let parsedModel = modelHelpers.parseObjectIntoModel(argoDataObject, argoRepositoryMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setArgoRepositoryData({...parsedModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={argoRepositoryMetadata.type} loadData={loadData}>
      <ArgoRepositoryEditorPanel
        argoRepositoryData={argoRepositoryData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        repoId={repoId}
      />
    </CreateCenterPanel>
  );
}

ArgoRepositoryOverlay.propTypes = {
  toolData: PropTypes.object,
  argoDataObject: PropTypes.object,
  loadData: PropTypes.func,
  repoId: PropTypes.string,
};

export default ArgoRepositoryOverlay;
