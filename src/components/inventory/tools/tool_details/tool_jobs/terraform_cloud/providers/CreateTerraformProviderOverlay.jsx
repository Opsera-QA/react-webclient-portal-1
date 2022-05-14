import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import Model from "core/data_model/model";
import {terraformProvidersMetadata} from "./terraformProviders.metadata";
import TerraformProvidersEditorPanel from "./details/TerraformProvidersEditorPanel";

function CreateTerraformProviderOverlay({ loadData, toolId, isMounted, organizationName }) {
  const toastContext = useContext(DialogToastContext);
  const [terraformProvidersModel, setTerraformProvidersModel] = useState(new Model({...terraformProvidersMetadata.newObjectFields}, terraformProvidersMetadata, true));

  useEffect (() => {
    let newDataObject = {...terraformProvidersModel};    
    newDataObject.setData("organizationName", organizationName);
    setTerraformProvidersModel({...newDataObject});
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
      objectType={terraformProvidersMetadata.type}
      loadData={loadData}
    >
      <TerraformProvidersEditorPanel
        terraformProvidersModel={terraformProvidersModel}
        setTerraformProvidersModel={setTerraformProvidersModel}
        toolId={toolId}
        handleClose={handleClose}
        editMode={false}
      />
    </CreateCenterPanel>
  );
}

CreateTerraformProviderOverlay.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  organizationName: PropTypes.string,
};

export default CreateTerraformProviderOverlay;
