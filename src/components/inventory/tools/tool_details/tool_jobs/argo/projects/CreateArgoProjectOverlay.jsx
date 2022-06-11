import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import argoProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/argo-project-metadata";
import ArgoProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/details/ArgoProjectEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function CreateArgoProjectOverlay({ loadData, toolData, argoDataObject, projId }) {
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
  }, [argoDataObject]);

  const initializeModel = () => {
    let parsedModel = modelHelpers.parseObjectIntoModel(argoDataObject, argoProjectMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

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
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        projId={projId}
      />
    </CreateCenterPanel>
  );
}

CreateArgoProjectOverlay.propTypes = {
  toolData: PropTypes.object,
  argoDataObject: PropTypes.object,
  loadData: PropTypes.func,
  projId: PropTypes.string,
};

export default CreateArgoProjectOverlay;
