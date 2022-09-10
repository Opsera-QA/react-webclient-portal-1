import React from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeletePipelineConfirmationOverlay
  from "components/workflow/pipelines/summary/action_bar/buttons/DeletePipelineConfirmationOverlay";

// TODO: Wire up Role Definitions
export default function ActionBarDeletePipelineButton(
  {
    pipeline,
    isActionAllowedFunction,
    refreshAfterDeletion,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const showDeleteConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeletePipelineConfirmationOverlay
        pipeline={pipeline}
        refreshAfterDeletion={refreshAfterDeletion}
      />
    );
  };

  if (pipeline == null || isActionAllowedFunction == null || isActionAllowedFunction("delete_pipeline_btn", pipeline?.owner) !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showDeleteConfirmationOverlay}
      type={"Pipeline"}
      className={"ml-3"}
    />
  );
}

ActionBarDeletePipelineButton.propTypes = {
  pipeline: PropTypes.object,
  isActionAllowedFunction: PropTypes.func,
  refreshAfterDeletion: PropTypes.bool,
};