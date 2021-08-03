import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import azureApplicationsMetadata from "components/inventory/tools/tool_details/tool_jobs/azure/applications/azure-application-metadata";
import AzureApplicationEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/azure/applications/details/AzureApplicationEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function AzureApplicationOverlay({ loadData, toolData, azureDataObject, applicationId }) {
  const toastContext = useContext(DialogToastContext);
  const [azureApplicationData, setAzureApplicationData] = useState(undefined);
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
  }, [azureDataObject]);

  const initializeModel = () => {
    setAzureApplicationData(modelHelpers.parseObjectIntoModel(azureDataObject, azureApplicationsMetadata));
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={azureApplicationsMetadata.type} loadData={loadData}>
      <AzureApplicationEditorPanel
        azureApplicationData={azureApplicationData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        applicationId={applicationId}
      />
    </CreateCenterPanel>
  );
}

AzureApplicationOverlay.propTypes = {
  toolData: PropTypes.object,
  azureDataObject: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.string,
};

export default AzureApplicationOverlay;
