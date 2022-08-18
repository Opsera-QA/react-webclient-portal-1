import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreatePipelineWizard from "components/wizard/free_trial/pipeline/CreatePipelineWizard";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import WizardWidgetDataBlockBase from "components/trial/landing/widgets/wizard/WizardWidgetDataBlockBase";

export default function FreeTrialLandingSalesforcePipelineWizardWidget({ className }) {
  const { themeConstants } = useComponentStateReference();
  const { toastContext } = useComponentStateReference();

  const launchPipelineCreationWizard = () => {
    toastContext.showOverlayPanel(
      <CreatePipelineWizard
      />,
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
