import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";
import {terraformCloudWorkspacesMetadata} from "./terraformCloudWorkspaces.metadata";
import TerraformCloudWorkspacesEditorPanel from "./details/TerraformCloudWorkspacesEditorPanel";

function CreateTerraformCloudWorkspaceOverlay({ loadData, toolId, isMounted, organizationName }) {
  const toastContext = useContext(DialogToastContext);
  const [terraformCloudWorkspacesModel, setTerraformCloudWorkspacesModel] = useState(new Model({...terraformCloudWorkspacesMetadata.newObjectFields}, terraformCloudWorkspacesMetadata, true));

  useEffect (() => {
    let newDataObject = {...terraformCloudWorkspacesModel};    
    newDataObject.setData("organizationName", organizationName);
    setTerraformCloudWorkspacesModel({...newDataObject});
  }, []);

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
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  organizationName: PropTypes.string,
};

export default CreateTerraformCloudWorkspaceOverlay;
