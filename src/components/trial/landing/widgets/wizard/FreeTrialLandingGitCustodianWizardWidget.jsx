import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreatePipelineWizard from "components/wizard/free_trial/pipeline/CreatePipelineWizard";
import WizardWidgetDataBlockBase from "components/trial/landing/widgets/wizard/WizardWidgetDataBlockBase";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import { faGit } from "@fortawesome/free-brands-svg-icons";

export default function FreeTrialLandingGitCustodianWizardWidget({ className }) {
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
        <div>Git</div>
        <div>Custodian</div>
        <div>Wizard</div>
      </div>
    );
  };

  return (
    <WizardWidgetDataBlockBase
      icon={faGit}
      iconStyling={{
        color: themeConstants.COLOR_PALETTE.BLACK,
      }}
      iconSize={"3x"}
      text={getText()}
      onClickFunction={launchPipelineCreationWizard}
      className={className}
      disabled={true}
    />
  );
}

FreeTrialLandingGitCustodianWizardWidget.propTypes = {
  className: PropTypes.string,
};
