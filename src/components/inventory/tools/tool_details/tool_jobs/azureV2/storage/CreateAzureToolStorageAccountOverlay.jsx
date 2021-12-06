import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import azureStorageMetadata from "./azure-storage-metadata";
import AzureToolStorageEditorPanel from "./details/AzureToolStorageAccountEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";

function CreateAzureStoragesOverlay({ loadData, toolId, isMounted, toolData }) {
  const toastContext = useContext(DialogToastContext);
  const [azureStorageAccountsModel, setAzureStorageAccountsModel] = useState(new Model({...azureStorageMetadata.newObjectFields}, azureStorageMetadata, true));

  const handleClose = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (toolId == null) {
    return null;
  }

  return (
    <CreateCenterPanel 
      closePanel={handleClose} 
      objectType={azureStorageMetadata.type} 
      loadData={loadData}
    >
      <AzureToolStorageEditorPanel
        azureStorageAccountsModel={azureStorageAccountsModel}
        setAzureStorageAccountsModel={setAzureStorageAccountsModel}
        toolId={toolId}
        handleClose={handleClose}
      />
    </CreateCenterPanel>
  );
}

CreateAzureStoragesOverlay.propTypes = {
  toolId: PropTypes.string,
  editRowData: PropTypes.object,
  loadData: PropTypes.func,
  editMode: PropTypes.bool,
  isMounted: PropTypes.object,
  toolData: PropTypes.object
};

export default CreateAzureStoragesOverlay;
