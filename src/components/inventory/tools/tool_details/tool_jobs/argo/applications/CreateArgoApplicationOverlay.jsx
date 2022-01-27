import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import argoApplicationsMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/applications/argo-application-metadata";
import ArgoApplicationEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/details/ArgoApplicationEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function CreateArgoApplicationOverlay({ loadData, toolData, argoDataObject, applicationId }) {
  const toastContext = useContext(DialogToastContext);
  const [argoApplicationData, setArgoApplicationData] = useState(undefined);
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
    let parsedModel = modelHelpers.parseObjectIntoModel(argoDataObject, argoApplicationsMetadata);

    if (parsedModel?.isNew()) {
      parsedModel.setData("toolId", toolData?.getData("_id"));
    }

    setArgoApplicationData({...parsedModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={argoApplicationsMetadata.type} loadData={loadData}>
      <ArgoApplicationEditorPanel
        argoApplicationData={argoApplicationData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        applicationId={applicationId}
      />
    </CreateCenterPanel>
  );
}

CreateArgoApplicationOverlay.propTypes = {
  toolData: PropTypes.object,
  argoDataObject: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.string,
};

export default CreateArgoApplicationOverlay;
