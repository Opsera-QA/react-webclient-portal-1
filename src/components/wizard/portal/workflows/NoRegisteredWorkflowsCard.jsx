import PropTypes from "prop-types";
import React from "react";
import CreateWorkflowWizard from "components/wizard/portal/workflows/CreateWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import OpseraInfinityLogoSelectionCardBase from "temp-library-components/cards/opsera/OpseraInfinityLogoSelectionCardBase";

export default function NoRegisteredWorkflowsCard(
  {
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchWorkflowCreationWizardFunction = () => {
    toastContext.showOverlayPanel(
      <CreateWorkflowWizard />
    );
  };

  return (
    <OpseraInfinityLogoSelectionCardBase
      className={className}
      title={"You haven't registered any Workflows yet!"}
      subTitle={"Click here to register a new Workflow"}
      onClickFunction={launchWorkflowCreationWizardFunction}
    />
  );
}

NoRegisteredWorkflowsCard.propTypes = {
  className: PropTypes.string,
};