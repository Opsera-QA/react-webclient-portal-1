import React from "react";
import PropTypes from "prop-types";
import ActionBarDuplicateButton from "components/common/actions/buttons/ActionBarDuplicateButton";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import DuplicatePipelineConfirmationOverlay
  from "components/workflow/pipelines/summary/action_bar/buttons/duplicate/DuplicatePipelineConfirmationOverlay";

export default function ActionBarDuplicatePipelineButton({pipelineModel}) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  const launchDuplicationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DuplicatePipelineConfirmationOverlay
        pipelineModel={pipelineModel}
      />
    );
  };

  if (
    pipelineModel == null
    || PipelineRoleHelper.canCreatePipeline(userData) !== true
    || PipelineRoleHelper.canDuplicatePipeline(userData, pipelineModel?.getCurrentData()) !== true
  ) {
    return null;
  }

  return (
    <ActionBarDuplicateButton
      duplicateFunction={launchDuplicationConfirmationOverlay}
      itemName={"Pipeline"}
      className={"ml-3"}
    />
  );
}

ActionBarDuplicatePipelineButton.propTypes = {
  pipelineModel: PropTypes.object,
};
