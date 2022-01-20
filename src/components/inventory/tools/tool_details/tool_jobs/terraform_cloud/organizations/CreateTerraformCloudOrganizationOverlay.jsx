import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";
import {terraformCloudOrganizationsMetadata} from "./terraformCloudOrganizations.metadata";
import TerraformCloudOrganizationsEditorPanel from "./details/TerraformCloudOrganizationsEditorPanel";

function CreateTerraformCloudOrganizationOverlay({ loadData, toolId, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [terraformCloudOrganizationsModel, setTerraformCloudOrganizationsModel] = useState(new Model({...terraformCloudOrganizationsMetadata.newObjectFields}, terraformCloudOrganizationsMetadata, true));

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
      objectType={terraformCloudOrganizationsMetadata.type}
      loadData={loadData}
    >
      <TerraformCloudOrganizationsEditorPanel
        terraformCloudOrganizationsModel={terraformCloudOrganizationsModel}
        setTerraformCloudOrganizationsModel={setTerraformCloudOrganizationsModel}
        toolId={toolId}
        handleClose={handleClose}
      />
    </CreateCenterPanel>
  );
}

CreateTerraformCloudOrganizationOverlay.propTypes = {
  toolId: PropTypes.string,
  editRowData: PropTypes.object,
  loadData: PropTypes.func,
  editMode: PropTypes.bool,
  isMounted: PropTypes.object,
  toolData: PropTypes.object
};

export default CreateTerraformCloudOrganizationOverlay;
