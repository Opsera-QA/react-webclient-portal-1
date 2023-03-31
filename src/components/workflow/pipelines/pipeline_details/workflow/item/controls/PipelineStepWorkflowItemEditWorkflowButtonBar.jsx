import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  faCaretSquareDown,
  faCaretSquareUp,
  faCopy, faPlusSquare,
} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import {sleep} from "utils/helpers";

export default function PipelineStepWorkflowItemEditWorkflowButtonBar(
  {
    loadPipeline,
    index,
    pipelineId,
    inWorkflowEditMode,
    plan,
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

  const handleAddStep = async () => {
    try {
      setIsSaving(true);
      await pipelineActions.addPipelineStepAtIndex(pipelineId, index + 1);
      await delayedRefresh();
    } catch (error) {
      toastContext.showCreateFailureResultDialog("Pipeline Step", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyStep = async () => {
    try {
      setIsSaving(true);
      await pipelineActions.duplicatePipelineStepAtIndex(
        pipelineId,
        pipelineStepId,
        index,
      );
      await delayedRefresh();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Could not duplicate Pipeline Step:");
    } finally {
      setIsSaving(false);
    }
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

  const moveStepDown = async () => {
    try {
      setIsSaving(true);
      await pipelineActions.movePipelineStepDown(
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
    <div
      className={`text-center d-flex step-plus-${index}`}
      style={{
        height: "42px",
      }}
    >
      <div className={"m-auto d-flex"}>
        <OverlayIconBase
          icon={faCaretSquareUp}
          iconSize={"lg"}
          className={index === 0 ? "fa-disabled" : "pointer dark-grey"}
          onClickFunction={isSaving !== true && index !== 0 ? () => moveStepUp() : undefined}
          overlayBody={"Move lower step up one position"}
        />
        <OverlayIconBase
          icon={faPlusSquare}
          iconSize={"lg"}
          className={"green pointer ml-2 mr-1"}
          onClickFunction={isSaving !== true ? () => handleAddStep() : undefined}
          overlayBody={"Add new step here"}
        />
        <IconBase isLoading={isSaving} />
        <OverlayIconBase
          icon={faCopy}
          iconSize={"lg"}
          className={"yellow pointer ml-1 mr-2"}
          onClickFunction={isSaving !== true ? () => handleCopyStep() : undefined}
          overlayBody={"Copy previous step"}
        />
        <OverlayIconBase
          icon={faCaretSquareDown}
          iconSize={"lg"}
          className={index === plan.length - 1 ? "fa-disabled" : "pointer dark-grey"}
          onClickFunction={isSaving !== true && index >= plan.length - 1 ? () => moveStepDown() : undefined}
          overlayBody={"Move upper step down one position"}
        />
      </div>
    </div>
  );
}

PipelineStepWorkflowItemEditWorkflowButtonBar.propTypes = {
  pipelineId: PropTypes.string,
  index: PropTypes.number,
  loadPipeline: PropTypes.func,
  inWorkflowEditMode: PropTypes.bool,
  pipelineStepId: PropTypes.string,
  plan: PropTypes.array,
  isSaving: PropTypes.bool,
  setIsSaving: PropTypes.func,
};