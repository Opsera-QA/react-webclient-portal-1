import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import externalApiIntegratorEndpointMetadata from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoint.metadata";
import ExternalApiIntegratorEndpointEditorPanel
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointEditorPanel";
import modelHelpers from "components/common/model/modelHelpers";
import PlatformSettingFeatureEditorPanel
  from "components/admin/platform_settings/details/features/PlatformSettingFeatureEditorPanel";

function NewPlatformSettingFeatureOverlay(
  {
    platformSettingsId,
    loadData,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [platformSettingFeatureModel, setPlatformSettingFeatureModel] = useState(modelHelpers.parseObjectIntoModel(undefined, externalApiIntegratorEndpointMetadata));

  const closePanelFunction = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (platformSettingFeatureModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      objectType={externalApiIntegratorEndpointMetadata?.type}
      loadData={loadData}
      closePanel={closePanelFunction}
    >
      <div className={"m-3"}>
        <PlatformSettingFeatureEditorPanel
          externalApiIntegratorModel={platformSettingFeatureModel}
          setExternalApiIntegratorModel={setPlatformSettingFeatureModel}
          closePanelFunction={closePanelFunction}
          platformSettingsId={platformSettingsId}
        />
      </div>
    </CreateCenterPanel>
  );
}

NewPlatformSettingFeatureOverlay.propTypes = {
  platformSettingsId: PropTypes.string,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};

export default NewPlatformSettingFeatureOverlay;
