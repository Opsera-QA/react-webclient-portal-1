import React, {useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import CreateSalesforcePipelineWizard
  from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforcePipelineWizard";

export default function FreeTrialSalesforcePipelineWizardOverlay() {
  const toastContext = useContext(DialogToastContext);



  const closeOverlayFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closeOverlayFunction}
      objectType={"Pipeline"}
      showCloseButton={true}
    >
      <CreateSalesforcePipelineWizard
      />
    </CreateCenterPanel>
  );
}

FreeTrialSalesforcePipelineWizardOverlay.propTypes = {};


