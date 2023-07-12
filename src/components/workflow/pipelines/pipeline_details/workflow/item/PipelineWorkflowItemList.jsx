import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { SteppedLineTo } from "react-lineto";
import { faPlusSquare, faCaretSquareDown, faCaretSquareUp, faCopy } from "@fortawesome/pro-light-svg-icons";
import PipelineWorkflowItem from "components/workflow/pipelines/pipeline_details/workflow/item/PipelineWorkflowItem";
import { pipelineValidationHelper } from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import IconBase from "components/common/icons/IconBase";
import useGetToolIdentifiers from "components/admin/tools/identifiers/hooks/useGetToolIdentifiers";

export default function PipelineWorkflowItemList(
  {
    pipeline,
    plan,
    lastStep,
    editWorkflow,
    pipelineId,
    parentCallbackEditItem,
    fetchPlan,
    parentWorkflowStatus,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    toastContext,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();
  const {
    toolIdentifiers,
    isLoading,
    getToolIdentifierByIdentifier,
  } = useGetToolIdentifiers();

  useEffect(() => {}, []);

  const delayedRefresh = async () => {
    await fetchPlan();
  };

  const handleAddStep = async (itemId, index) => {
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

  const handleCopyStep = async (itemId, index) => {
    try {
      setIsSaving(true);
      await pipelineActions.duplicatePipelineStepAtIndex(
        pipelineId,
        itemId,
        index,
      );
      await delayedRefresh();
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
      await delayedRefresh();
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
      await delayedRefresh();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Could not move Pipeline Step:");
    } finally {
      setIsSaving(false);
    }
  };


  const setStepStatusClass = (item) => {
    const item_id = DataParsingHelper.parseMongoDbId(item?._id);
    let classString = "step-" + item_id;

    const isStepValid = pipelineValidationHelper.isPipelineStepToolValid(item.tool);

    let stepStatusClass =
      !item.active
        ? "workflow-step-disabled"
        : !isStepValid
          ? "workflow-step-warning"
          : "";

    //if operations have occurred and the step is still valid
    if (typeof (lastStep) !== "undefined" && isStepValid) {
      const {success, running, failed} = lastStep;

      if (success && success.step_id === item_id) {
        stepStatusClass = "workflow-step-success";
      }

      if (running && running.step_id === item_id) {
        stepStatusClass = running.paused ? "workflow-step-warning"
          : running.status === "stopped" ? "workflow-step-stopped"
            : "workflow-step-running";
      }

      if (failed && failed.step_id === item_id) {
        stepStatusClass = "workflow-step-failure";
      }
    }

    return classString += " " + stepStatusClass;
  };

  const getPipelineWorkflowItemControls = (item, index) => {
    if (editWorkflow) {
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
              onClickFunction={isSaving !== true && index !== 0 ? () => moveStepUp(item._id) : undefined}
              overlayBody={"Move lower step up one position"}
            />
            <OverlayIconBase
              icon={faPlusSquare}
              iconSize={"lg"}
              className={"green pointer ml-2 mr-1"}
              onClickFunction={isSaving !== true ? () => handleAddStep(item._id, index) : undefined}
              overlayBody={"Add new step here"}
            />
            <IconBase isLoading={isLoading || isSaving} />
            <OverlayIconBase
              icon={faCopy}
              iconSize={"lg"}
              className={"yellow pointer ml-1 mr-2"}
              onClickFunction={isSaving !== true ? () => handleCopyStep(item._id, index) : undefined}
              overlayBody={"Copy previous step"}
            />
            <OverlayIconBase
              icon={faCaretSquareDown}
              iconSize={"lg"}
              className={index >= plan.length - 1 ? "fa-disabled" : "pointer dark-grey"}
              onClickFunction={isSaving !== true && index < plan.length - 1 ? () => moveStepDown(item._id) : undefined}
              overlayBody={"Move upper step down one position"}
            />
          </div>
        </div>
      );
    }

    return (
      <>
        <SteppedLineTo
          from={`step-${item._id}`}
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
  };

  return (
    <div className="step-items workflow-module-container-width mx-auto">
      {Array.isArray(plan) && plan.map((item, index) => (
        <div
          key={index}
          className={isSaving ? "fa-disabled" : ""}
        >
          <div
            className={"p-1 workflow-module-container workflow-module-container-width mx-auto " + setStepStatusClass(item)}
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              borderRadius: ".35rem",
            }}
          >
            <PipelineWorkflowItem
              pipeline={pipeline}
              plan={plan}
              item={item}
              index={index}
              lastStep={lastStep}
              editWorkflow={editWorkflow}
              pipelineId={pipelineId}
              tempLoading={isLoading}
              parentCallbackEditItem={parentCallbackEditItem}
              parentWorkflowStatus={parentWorkflowStatus}
              toolIdentifier={getToolIdentifierByIdentifier(item?.tool?.tool_identifier)}
              loadPipeline={fetchPlan}
            />
          </div>
          {getPipelineWorkflowItemControls(item, index)}
        </div>
      ))}
    </div>
  );
}

PipelineWorkflowItemList.propTypes = {
  pipeline: PropTypes.object,
  lastStep: PropTypes.object,
  editWorkflow: PropTypes.bool,
  pipelineId: PropTypes.string,
  parentCallbackEditItem: PropTypes.func,
  fetchPlan: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  plan: PropTypes.array,
};
