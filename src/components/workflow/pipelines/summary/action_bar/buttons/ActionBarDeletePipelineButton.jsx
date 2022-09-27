import React from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeletePipelineConfirmationOverlay
  from "components/workflow/pipelines/summary/action_bar/buttons/DeletePipelineConfirmationOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

export default function ActionBarDeletePipelineButton(
  {
    pipeline,
    refreshAfterDeletion,
    className,
  }) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  const showDeleteConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeletePipelineConfirmationOverlay
        pipeline={pipeline}
        refreshAfterDeletion={refreshAfterDeletion}
      />
    );
  };

  if (pipeline == null || PipelineRoleHelper.canDeletePipeline(userData, pipeline) !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showDeleteConfirmationOverlay}
      type={"Pipeline"}
      className={className}
    />
  );
}

ActionBarDeletePipelineButton.propTypes = {
  pipeline: PropTypes.object,
  refreshAfterDeletion: PropTypes.bool,
  className: PropTypes.string,
};