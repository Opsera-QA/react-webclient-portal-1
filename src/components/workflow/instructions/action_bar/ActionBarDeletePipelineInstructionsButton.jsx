import React from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeletePipelineInstructionsOverlay
  from "components/settings/pipelines/instructions/delete_overlay/DeletePipelineInstructionsOverlay";

export default function ActionBarDeletePipelineInstructionsButton(
  {
    pipelineInstructionsModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchDeleteConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeletePipelineInstructionsOverlay
        pipelineInstructionsModel={pipelineInstructionsModel}
      />
    );
  };

  if (pipelineInstructionsModel?.canDelete() !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={launchDeleteConfirmationOverlay}
      model={pipelineInstructionsModel}
      type={"Pipeline Instructions"}
      className={className}
    />
  );
}

ActionBarDeletePipelineInstructionsButton.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
  className: PropTypes.string,
};