import React from "react";
import PropTypes from "prop-types";
import {
  faCaretSquareUp,
} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import {sleep} from "utils/helpers";

export default function EditWorkflowMovePipelineStepUpButton(
  {
    loadPipeline,
    index,
    pipelineId,
    inWorkflowEditMode,
    pipelineStepId,
    isSaving,
    setIsSaving,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();

  const delayedRefresh = async () => {
    await sleep(2500);
    await loadPipeline();
  };

  const moveStepUp = async () => {
    try {
      setIsSaving(true);
      await pipelineActions.movePipelineStepUp(
        pipelineId,
        pipelineStepId,
      );
      await delayedRefresh();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Could not move Pipeline Step:");
    } finally {
      setIsSaving(false);
    }
  };

  if (inWorkflowEditMode !== true) {
    return null;
  }

  return (
    <OverlayIconBase
      icon={faCaretSquareUp}
      iconSize={"lg"}
      className={index === 0 ? "fa-disabled" : "pointer dark-grey"}
      onClickFunction={isSaving !== true && index !== 0 ? () => moveStepUp() : undefined}
      overlayBody={"Move lower step up one position"}
    />
  );
}

EditWorkflowMovePipelineStepUpButton.propTypes = {
  pipelineId: PropTypes.string,
  index: PropTypes.number,
  loadPipeline: PropTypes.func,
  inWorkflowEditMode: PropTypes.bool,
  pipelineStepId: PropTypes.string,
  isSaving: PropTypes.bool,
  setIsSaving: PropTypes.func,
};