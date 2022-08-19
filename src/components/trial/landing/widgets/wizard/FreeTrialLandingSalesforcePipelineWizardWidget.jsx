import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import WizardWidgetDataBlockBase from "components/trial/landing/widgets/wizard/WizardWidgetDataBlockBase";
import FreeTrialSalesforcePipelineWizardOverlay
  from "components/wizard/free_trial/pipeline/salesforce_flow/FreeTrialSalesforcePipelineWizardOverlay";

export default function FreeTrialLandingSalesforcePipelineWizardWidget({ className }) {
  const { themeConstants } = useComponentStateReference();
  const { toastContext } = useComponentStateReference();

  const launchPipelineCreationWizard = () => {
    toastContext.showOverlayPanel(
      <FreeTrialSalesforcePipelineWizardOverlay
      />
    );
  };

  const getText = () => {
    return (
    <div>
      <div>Salesforce</div>
      <div>Pipeline</div>
      <div>Wizard</div>
    </div>
    );
  };

  return (
    <WizardWidgetDataBlockBase
      icon={faSalesforce}
      iconStyling={{
        color: themeConstants.COLOR_PALETTE.SALESFORCE_BLUE,
      }}
      iconSize={"4x"}
      text={getText()}
      onClickFunction={launchPipelineCreationWizard}
      className={className}
    />
  );
}

FreeTrialLandingSalesforcePipelineWizardWidget.propTypes = {
  className: PropTypes.string,
};
