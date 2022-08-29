import PropTypes from "prop-types";
import React from "react";
import CreateWorkflowWizard from "components/wizard/free_trial/workflows/CreateWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import OpseraInfinityCard from "temp-library-components/cards/opsera/OpseraInfinityCard";

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
    <OpseraInfinityCard
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