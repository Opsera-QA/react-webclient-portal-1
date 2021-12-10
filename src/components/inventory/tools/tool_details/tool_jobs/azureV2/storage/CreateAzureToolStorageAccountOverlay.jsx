import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import azureStorageAccountMetadata from "components/inventory/tools/tool_details/tool_jobs/azureV2/storage/azureStorageAccount.metadata";
import AzureToolStorageEditorPanel from "components/inventory/tools/tool_details/tool_jobs/azureV2/storage/details/AzureToolStorageAccountEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";

function CreateAzureStoragesOverlay({ loadData, toolId, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [azureStorageAccountsModel, setAzureStorageAccountsModel] = useState(new Model({...azureStorageAccountMetadata.newObjectFields}, azureStorageAccountMetadata, true));

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
      objectType={azureStorageAccountMetadata.type}
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
