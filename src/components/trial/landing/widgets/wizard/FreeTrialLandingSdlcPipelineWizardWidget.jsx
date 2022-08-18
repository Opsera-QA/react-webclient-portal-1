import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreatePipelineWizard from "components/wizard/free_trial/pipeline/CreatePipelineWizard";
import WizardWidgetDataBlockBase from "components/trial/landing/widgets/wizard/WizardWidgetDataBlockBase";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";

export default function FreeTrialLandingSdlcPipelineWizardWidget({ className }) {
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
        <div>SDLC</div>
        <div>Pipeline</div>
        <div>Wizard</div>
      </div>
    );
  };

  return (
    <WizardWidgetDataBlockBase
      icon={faBracketsCurly}
      iconStyling={{
        color: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
      }}
      iconSize={"3x"}
      text={getText()}
      onClickFunction={launchPipelineCreationWizard}
      className={className}
      disabled={true}
    />
  );
}

FreeTrialLandingSdlcPipelineWizardWidget.propTypes = {
  className: PropTypes.string,
};
