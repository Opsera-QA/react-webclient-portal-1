import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import argoProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-project-metadata";
import ArgoProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/details/ArgoProjectEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function CreateArgoProjectOverlay({ loadData, toolId}) {
  const toastContext = useContext(DialogToastContext);
  const [argoProjectData, setArgoProjectData] = useState(undefined);
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
    const parsedModel = modelHelpers.parseObjectIntoModel({}, argoProjectMetadata);
    parsedModel.setData("toolId", toolId);
    setArgoProjectData({...parsedModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={argoProjectMetadata.type} loadData={loadData}>
      <ArgoProjectEditorPanel
        argoProjectData={argoProjectData}
        toolId={toolId}
        loadData={loadData}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

CreateArgoProjectOverlay.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
};

export default CreateArgoProjectOverlay;
