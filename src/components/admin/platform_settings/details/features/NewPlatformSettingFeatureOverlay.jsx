import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import modelHelpers from "components/common/model/modelHelpers";
import PlatformSettingFeatureEditorPanel
  from "components/admin/platform_settings/details/features/PlatformSettingFeatureEditorPanel";
import {
  platformSettingFeatureMetadata
} from "components/admin/platform_settings/details/features/platformSettingFeature.metadata";

function NewPlatformSettingFeatureOverlay(
  {
    platformSettingsId,
    loadData,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [platformSettingFeatureModel, setPlatformSettingFeatureModel] = useState(modelHelpers.parseObjectIntoModel(undefined, platformSettingFeatureMetadata));

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
      objectType={platformSettingFeatureMetadata?.type}
      loadData={loadData}
      closePanel={closePanelFunction}
    >
      <div className={"m-3"}>
        <PlatformSettingFeatureEditorPanel
          platformSettingFeatureModel={platformSettingFeatureModel}
          setPlatformSettingFeatureModel={setPlatformSettingFeatureModel}
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
