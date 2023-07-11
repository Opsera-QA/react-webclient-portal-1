import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import externalApiIntegratorEndpointMetadata from "@opsera/definitions/constants/registry/tools/external_api_integrator/externalApiIntegratorEndpoint.metadata";
import ExternalApiIntegratorEndpointEditorPanel from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";

function NewExternalApiIntegratorEndpointOverlay(
  {
    toolId,
    loadData,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [externalApiIntegratorModel, setExternalApiIntegratorModel] = useState(modelHelpers.parseObjectIntoModel(undefined, externalApiIntegratorEndpointMetadata));

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
      objectType={externalApiIntegratorEndpointMetadata?.type}
      loadData={loadData}
      closePanel={closePanelFunction}
    >
      <div className={"m-3"}>
        <ExternalApiIntegratorEndpointEditorPanel
          externalApiIntegratorModel={externalApiIntegratorModel}
          setExternalApiIntegratorModel={setExternalApiIntegratorModel}
          closePanelFunction={closePanelFunction}
          toolId={toolId}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewExternalApiIntegratorEndpointOverlay.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default NewExternalApiIntegratorEndpointOverlay;
