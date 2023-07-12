import React from "react";
import PropTypes from "prop-types";
import {faCaretSquareUp, faPlusSquare, faCopy, faCaretSquareDown} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import IconBase from "components/common/icons/IconBase";
import {SteppedLineTo} from "react-lineto";
import useComponentStateReference from "hooks/useComponentStateReference";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";

// TODO: Make separate icon components and put the update functions in there.
export default function PipelineStepCardWorkflowActionBar(
  {
    pipelineId,
    step,
    isEditingWorkflow,
    loadPipeline,
    index,
    isLoading,
    plan,
    isSaving,
    setIsSaving,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();
  
  const handleAddStep = async (itemId, index) => {
    try {
      setIsSaving(true);
      await pipelineActions.addPipelineStepAtIndex(pipelineId, index + 1);
      await loadPipeline();
    } catch (error) {
      toastContext.showCreateFailureResultDialog("Pipeline Step", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyStep = async (itemId, index) => {
    try {
      setIsSaving(true);
      await pipelineActions.duplicatePipelineStepAtIndex(
        pipelineId,
        itemId,
        index,
      );
      await loadPipeline();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Could not duplicate Pipeline Step:");
    } finally {
      setIsSaving(false);
    }
  };

  const moveStepUp = async (itemId) => {
    try {
      setIsSaving(true);
      await pipelineActions.movePipelineStepUp(
        pipelineId,
        itemId,
      );
      await loadPipeline();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Could not move Pipeline Step:");
    } finally {
      setIsSaving(false);
    }
  };

  const moveStepDown = async (itemId) => {
    try {
      setIsSaving(true);
      await pipelineActions.movePipelineStepDown(
        pipelineId,
        itemId,
      );
      await loadPipeline();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Could not move Pipeline Step:");
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isEditingWorkflow) {
    return (
      <div
        className={`text-center d-flex`}
        style={{
          height: "42px",
        }}
      >
        <div className={"m-auto d-flex"}>
          <OverlayIconBase
            icon={faCaretSquareUp}
            iconSize={"lg"}
            className={index === 0 ? "fa-disabled" : "pointer dark-grey"}
            onClickFunction={isSaving !== true && index !== 0 ? () => moveStepUp(step._id) : undefined}
            overlayBody={"Move lower step up one position"}
          />
          <OverlayIconBase
            icon={faPlusSquare}
            iconSize={"lg"}
            className={"green pointer ml-2 mr-1"}
            onClickFunction={isSaving !== true ? () => handleAddStep(step._id, index) : undefined}
            overlayBody={"Add new step here"}
          />
          <IconBase isLoading={isLoading || isSaving} />
          <OverlayIconBase
            icon={faCopy}
            iconSize={"lg"}
            className={"yellow pointer ml-1 mr-2"}
            onClickFunction={isSaving !== true ? () => handleCopyStep(step._id, index) : undefined}
            overlayBody={"Copy previous step"}
          />
          <OverlayIconBase
            icon={faCaretSquareDown}
            iconSize={"lg"}
            className={index >= plan.length - 1 ? "fa-disabled" : "pointer dark-grey"}
            onClickFunction={isSaving !== true && index < plan.length - 1 ? () => moveStepDown(step._id) : undefined}
            overlayBody={"Move upper step down one position"}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <SteppedLineTo
        from={`step-${step._id}`}
        to={`step-${index}`}
        delay={100}
        orientation={"v"}
        zIndex={10}
        borderColor={"#0f3e84"}
        borderWidth={2}
        fromAnchor={"bottom"}
        toAnchor={"bottom"}
      />
      <div style={{ height: "42px" }} className={"step-" + index}>&nbsp;</div>
    </>
  );
}

PipelineStepCardWorkflowActionBar.propTypes = {
  step: PropTypes.object,
  loadPipeline: PropTypes.func,
  isEditingWorkflow: PropTypes.bool,
  pipelineId: PropTypes.string,
  isLoading: PropTypes.bool,
  index: PropTypes.number,
  plan: PropTypes.array,
  isSaving: PropTypes.bool,
  setIsSaving: PropTypes.func,
};