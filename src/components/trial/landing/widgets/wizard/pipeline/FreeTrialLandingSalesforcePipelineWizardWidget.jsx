import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreatePipelineWizard from "components/wizard/free_trial/pipeline/CreatePipelineWizard";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import WizardWidgetDataBlockBase from "components/trial/landing/widgets/wizard/WizardWidgetDataBlockBase";

export default function FreeTrialLandingSalesforcePipelineWizardWidget({ className }) {
  const { toastContext } = useComponentStateReference();

  const launchPipelineCreationWizard = () => {
    toastContext.showOverlayPanel(
      <CreatePipelineWizard
      />,
    );
  };

  return (
    <WizardWidgetDataBlockBase
      icon={faSalesforce}
      middleText={"Salesforce"}
      bottomText={"Pipeline Wizard"}
      onClickFunction={launchPipelineCreationWizard}
      className={className}
    />
  );
}

FreeTrialLandingSalesforcePipelineWizardWidget.propTypes = {
  className: PropTypes.string,
};
