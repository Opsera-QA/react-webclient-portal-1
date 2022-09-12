import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import PlatformSystemParameterEditorPanel
  from "components/admin/system_parameters/details/PlatformSystemParameterEditorPanel";
import { platformSystemParametersMetadata } from "components/admin/system_parameters/platformSystemParameters.metadata";

export default function NewPlatformSystemParameterOverlay({ loadData} ) {
  const toastContext = useContext(DialogToastContext);
  const { isMounted } = useComponentStateReference();
  const [platformSystemParameterModel, setPlatformSystemParameterModel] = useState({...modelHelpers.getNewModelForMetadata(platformSystemParametersMetadata)});

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (platformSystemParameterModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={platformSystemParametersMetadata.type}
      loadData={loadData}
    >
      <PlatformSystemParameterEditorPanel
        platformSystemParameterModel={platformSystemParameterModel}
        setPlatformSystemParameterModel={setPlatformSystemParameterModel}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewPlatformSystemParameterOverlay.propTypes = {
  loadData: PropTypes.func,
};

