import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolEndpointsMetadata from "components/inventory/tools/details/endpoints/toolEndpoints.metadata";
import ExternalApiIntegratorEndpointEditorPanel
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";

function NewExternalApiIntegratorEndpointOverlay(
  {
    toolId,
    loadData,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [externalApiIntegratorModel, setExternalApiIntegratorModel] = useState(modelHelpers.parseObjectIntoModel(undefined, toolEndpointsMetadata));

  const closePanelFunction = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (externalApiIntegratorModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      objectType={toolEndpointsMetadata?.type}
      loadData={loadData}
      closePanel={closePanelFunction}
    >
      <ExternalApiIntegratorEndpointEditorPanel
        externalApiIntegratorModel={externalApiIntegratorModel}
        setExternalApiIntegratorModel={setExternalApiIntegratorModel}
        closePanelFunction={closePanelFunction}
        toolId={toolId}
      />
    </CreateCenterPanel>
  );
}

NewExternalApiIntegratorEndpointOverlay.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default NewExternalApiIntegratorEndpointOverlay;
