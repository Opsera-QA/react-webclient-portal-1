import PropTypes from "prop-types";
import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import OpseraInfinityLogoSelectionCardBase from "temp-library-components/cards/opsera/OpseraInfinityLogoSelectionCardBase";
import CreateWorkspaceResourceWizard from "components/wizard/workspace/CreateWorkspaceResourceWizard";

export default function NoRegisteredWorkflowsCard(
  {
    className,
    loadDataFunction,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchWorkflowCreationWizardFunction = () => {
    toastContext.showOverlayPanel(
      <CreateWorkspaceResourceWizard
        loadDataFunction={loadDataFunction}
      />
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
  loadDataFunction: PropTypes.func,
};