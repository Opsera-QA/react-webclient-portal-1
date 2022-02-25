import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";
import {terraformCloudWorkspacesMetadata} from "./terraformCloudWorkspaces.metadata";
import TerraformCloudWorkspacesEditorPanel from "./details/TerraformCloudWorkspacesEditorPanel";

function CreateTerraformCloudWorkspaceOverlay({ loadData, toolId, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [terraformCloudWorkspacesModel, setTerraformCloudWorkspacesModel] = useState(new Model({...terraformCloudWorkspacesMetadata.newObjectFields}, terraformCloudWorkspacesMetadata, true));

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
      objectType={terraformCloudWorkspacesMetadata.type}
      loadData={loadData}
    >
      <TerraformCloudWorkspacesEditorPanel
        terraformCloudWorkspacesModel={terraformCloudWorkspacesModel}
        setTerraformCloudWorkspacesModel={setTerraformCloudWorkspacesModel}
        toolId={toolId}
        handleClose={handleClose}
        editMode={false}
      />
    </CreateCenterPanel>
  );
}

CreateTerraformCloudWorkspaceOverlay.propTypes = {
  toolId: PropTypes.string,
  editRowData: PropTypes.object,
  loadData: PropTypes.func,
  editMode: PropTypes.bool,
  isMounted: PropTypes.object,
  toolData: PropTypes.object
};

export default CreateTerraformCloudWorkspaceOverlay;
