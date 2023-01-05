import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { SteppedLineTo } from "react-lineto";
import { faPlusSquare, faCaretSquareDown, faCaretSquareUp, faCopy } from "@fortawesome/pro-light-svg-icons";
import PipelineWorkflowItem from "./PipelineWorkflowItem";
import { pipelineValidationHelper } from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

function PipelineWorkflowItemList(
  {
    pipeline,
    plan,
    lastStep,
    editWorkflow,
    pipelineId,
    parentCallbackEditItem,
    quietSavePlan,
    fetchPlan,
    parentWorkflowStatus,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getToolIdentifiers();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getToolIdentifiers = async () => {
    const response = await toolIdentifierActions.getToolIdentifiersV2(getAccessToken, cancelTokenSource);
    const identifiers = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(identifiers)) {
      setToolIdentifiers(identifiers);
    }
  };

  const handleAddStep = async (itemId, index) => {
    const steps = plan;

    setIsSaving(true);

    const newStep = {
      "trigger": [],
      "type": [],
      "notification": [],
      "name": "",
      "description": "",
      "active": true,
    };
    steps.splice(index + 1, 0, newStep);
    await quietSavePlan(steps);

    setIsSaving(false);
  };


  const handleCopyStep = async (item, index) => {
    const steps = plan;

    setIsSaving(true);

    const newStep = {
      "trigger": item.trigger,
      "type": item.type,
      "tool": item.tool,
      "notification": item.notification,
      "name": "Copy of " + item.name,
      "description": item.description,
      "active": true,
    };
    steps.splice(index + 1, 0, newStep);

    await quietSavePlan(steps);

    setIsSaving(false);
  };

  const handleMoveStep = async (itemId, index, direction) => {
    const steps = plan;

    if (direction === "up" && index > 0) {
      setIsSaving(true);
      let cutOut = steps.splice(index, 1) [0];
      steps.splice(index - 1, 0, cutOut);

      await quietSavePlan(steps);
      setIsSaving(false);

    } else if (direction === "down" && index < steps.length - 1) {
      setIsSaving(true);

      let cutOut = steps.splice(index, 1) [0];
      steps.splice(index + 1, 0, cutOut);

      await quietSavePlan(steps);
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

  const getToolIdentifierForStep = (toolIdentifier) => {
    if (Array.isArray(toolIdentifiers) && toolIdentifiers.length > 0 && hasStringValue(toolIdentifier)) {
      return toolIdentifiers.find((identifier) => toolIdentifier === identifier?.identifier);
    }
  };

  const getPipelineWorkflowItemControls = (item, index) => {
    if (editWorkflow) {
      return (
        <div
          className={"text-center d-flex step-plus-" + index}
          style={{
            height: "42px",
          }}
        >
          <div className={"m-auto d-flex"}>
            <OverlayIconBase
              icon={faCaretSquareUp}
              iconSize={"lg"}
              className={index === 0 ? "fa-disabled" : "pointer dark-grey"}
              onClickFunction={() => handleMoveStep(item._id, index, "up")}
              overlayBody={"Move lower step up one position"}
            />
            <OverlayIconBase
              icon={faPlusSquare}
              iconSize={"lg"}
              className={"green pointer ml-2 mr-1"}
              onClickFunction={() => handleAddStep(item._id, index)}
              overlayBody={"Add new step here"}
            />
            <OverlayIconBase
              icon={faCopy}
              iconSize={"lg"}
              className={"yellow pointer ml-1 mr-2"}
              onClickFunction={() => handleCopyStep(item, index)}
              overlayBody={"Copy previous step"}
            />
            <OverlayIconBase
              icon={faCaretSquareDown}
              iconSize={"lg"}
              className={index === plan.length - 1 ? "fa-disabled" : "pointer dark-grey"}
              onClickFunction={() => handleMoveStep(item._id, index, "down")}
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
              borderRadius: ".25rem",
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
              toolIdentifier={getToolIdentifierForStep(item?.tool?.tool_identifier)}
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
  quietSavePlan: PropTypes.func,
  fetchPlan: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  plan: PropTypes.array,
};

export default PipelineWorkflowItemList;