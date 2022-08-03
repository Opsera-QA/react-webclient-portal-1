import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import argoRepositoryMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-repository-metadata";
import ArgoToolRepositoryEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/ArgoToolRepositoryEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function CreateArgoToolRepositoryOverlay({ loadData, toolId }) {
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
  }, []);

  const initializeModel = () => {
    const parsedModel = modelHelpers.parseObjectIntoModel(undefined, argoRepositoryMetadata);
    parsedModel.setData("toolId", toolId);
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
      <ArgoToolRepositoryEditorPanel
        argoRepositoryData={argoRepositoryData}
        toolId={toolId}
        loadData={loadData}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

CreateArgoToolRepositoryOverlay.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
};

export default CreateArgoToolRepositoryOverlay;
