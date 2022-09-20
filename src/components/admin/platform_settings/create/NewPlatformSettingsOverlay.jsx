import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import { platformSettingsMetadata } from "components/admin/platform_settings/platformSettings.metadata";
import PlatformSettingsEditorPanel from "components/admin/platform_settings/details/PlatformSettingsEditorPanel";

export default function NewPlatformSettingsOverlay({ loadData }) {
  const toastContext = useContext(DialogToastContext);
  const { isMounted } = useComponentStateReference();
  const [platformSettingsModel, setPlatformSettingsModel] = useState({...modelHelpers.getNewModelForMetadata(platformSettingsMetadata)});

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (platformSettingsModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={platformSettingsMetadata.type}
      loadData={loadData}
    >
      <PlatformSettingsEditorPanel
        platformSettingsModel={platformSettingsModel}
        setPlatformSettingsModel={setPlatformSettingsModel}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewPlatformSettingsOverlay.propTypes = {
  loadData: PropTypes.func,
};

