import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import azureStorageMetadata from "./azure-storage-metadata";
import AzureStorageEditorPanel from "./details/AzureStorageEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function AzureStoragesOverlay({ loadData, toolData, editMode, editRowData }) {
  const toastContext = useContext(DialogToastContext);
  const [azureStorageData, setAzureStorageData] = useState(undefined);
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
    setAzureStorageData(modelHelpers.parseObjectIntoModel({}, azureStorageMetadata));
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={azureStorageMetadata.type} loadData={loadData}>
      <AzureStorageEditorPanel
        azureStoragesData={azureStorageData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        editMode={editMode}
        editRowData={editRowData}
      />
    </CreateCenterPanel>
  );
}

AzureStoragesOverlay.propTypes = {
  toolData: PropTypes.object,
  editRowData: PropTypes.object,
  loadData: PropTypes.func,
  editMode: PropTypes.bool,
};

export default AzureStoragesOverlay;
