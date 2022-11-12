import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LineTo from "react-lineto";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { faPlusSquare, faCaretSquareDown, faCaretSquareUp, faCopy } from "@fortawesome/pro-light-svg-icons";
import PipelineWorkflowItem from "./PipelineWorkflowItem";
import StepValidationHelper from "./step_configuration/helpers/step-validation-helper";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";


function PipelineWorkflowItemList(
  {
    pipeline,
    lastStep,
    editWorkflow,
    pipelineId,
    parentCallbackEditItem,
    parentHandleViewSourceActivityLog,
    quietSavePlan,
    fetchPlan,
    parentWorkflowStatus,
    refreshCount,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState(pipeline.workflow.plan);
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
        console.error(error);
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

  useEffect(() => {
    if (pipeline) {
      setPipelineSteps(pipeline?.workflow?.plan);
    }
  }, [refreshCount, JSON.stringify(lastStep), JSON.stringify(pipeline.workflow)]);


  const handleAddStep = async (itemId, index) => {
    const steps = pipelineSteps;

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

    await fetchPlan();

    setIsSaving(false);
  };


  const handleCopyStep = async (item, index) => {
    const steps = pipelineSteps;

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

    await fetchPlan();

    setIsSaving(false);
  };


  const deleteStep = async (index) => {
    const steps = pipelineSteps;

    setIsSaving(true);
    steps.splice(index, 1);

    if (steps.length === 0) {
      await handleAddStep("", 0);
    } else {
      await quietSavePlan(steps);

      await fetchPlan();
    }

    setIsSaving(false);
  };


  const handleMoveStep = async (itemId, index, direction) => {
    const steps = pipelineSteps;

    if (direction === "up" && index > 0) {
      setIsSaving(true);
      let cutOut = steps.splice(index, 1) [0];
      steps.splice(index - 1, 0, cutOut);

      await quietSavePlan(steps);

      await fetchPlan();
      setIsSaving(false);

    } else if (direction === "down" && index < steps.length - 1) {
      setIsSaving(true);

      let cutOut = steps.splice(index, 1) [0];
      steps.splice(index + 1, 0, cutOut);

      await quietSavePlan(steps);

      await fetchPlan();
      setIsSaving(false);
    }
  };


  const setStepStatusClass = (last_step, item) => {
    const item_id = item._id;
    let classString = "step-" + item_id;

    const isStepValid = StepValidationHelper.isValidConfiguration(item.tool);

    let stepStatusClass = item.tool === undefined ? "workflow-step-warning"
      : item.tool.configuration === undefined ? "workflow-step-warning"
        : !isStepValid ? "workflow-step-warning"
          : !item.active ? "workflow-step-disabled"
            : "";

    //if operations have occurred and the step is still valid
    if (typeof (last_step) !== "undefined" && isStepValid) {
      const { success, running, failed } = last_step;

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

  return (
    <>
      {pipelineSteps && pipelineSteps.map((item, index) => (
        <div key={index} className={isSaving ? "fa-disabled" : ""}>
          <div className={"mb-1 p-1 workflow-module-container workflow-module-container-width mx-auto " +
          setStepStatusClass(lastStep, item)}>
            <PipelineWorkflowItem
              pipeline={pipeline}
              plan={pipelineSteps}
              item={item}
              index={index}
              lastStep={lastStep}
              editWorkflow={editWorkflow}
              pipelineId={pipelineId}
              parentCallbackEditItem={parentCallbackEditItem}
              deleteStep={deleteStep}
              refreshCount={refreshCount}
              parentHandleViewSourceActivityLog={parentHandleViewSourceActivityLog}
              parentWorkflowStatus={parentWorkflowStatus}
              toolIdentifier={getToolIdentifierForStep(item?.tool?.tool_identifier)}
              loadPipeline={fetchPlan}
            />
          </div>

          {editWorkflow ? <>
              <div className={"text-center my-3 step-plus-" + index}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Move lower step up one position" })}>
                  <IconBase icon={faCaretSquareUp} iconSize={"lg"}
                                   className={index === 0 ? "fa-disabled" : "pointer dark-grey"}
                                   onClickFunction={() => {
                                     handleMoveStep(item._id, index, "up");
                                   }} />
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Add new step here" })}>
                  <IconBase icon={faPlusSquare}
                                   iconSize={"lg"}
                                   className={"green pointer ml-2 mr-1"}
                                   onClickFunction={() => {
                                     handleAddStep(item._id, index);
                                   }} />
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Copy previous step" })}>
                  <IconBase icon={faCopy}
                                   iconSize={"lg"}
                                   className={"yellow pointer ml-1 mr-2"}
                            onClickFunction={() => {
                                     handleCopyStep(item, index);
                                   }} />
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Move upper step down one position" })}>
                  <IconBase icon={faCaretSquareDown} iconSize={"lg"}
                                   className={index === pipelineSteps.length - 1 ? "fa-disabled" : "pointer dark-grey"}
                                   onClickFunction={() => {
                                     handleMoveStep(item._id, index, "down");
                                   }} />
                </OverlayTrigger>
              </div>
            </> :
            <>
              <LineTo from={"step-" + item._id} to={"step-" + index} delay={100} orientation="v" zIndex={1}
                             borderColor="#0f3e84" borderWidth={2} fromAnchor="bottom" toAnchor="bottom" />
              <div style={{ height: "40px", opacity: "0", zIndex: "-1" }} className={"step-" + index}>&nbsp;</div>
            </>
          }

        </div>
      ))}
    </>
  );
}

function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}


PipelineWorkflowItemList.propTypes = {
  pipeline: PropTypes.object,
  lastStep: PropTypes.object,
  editWorkflow: PropTypes.bool,
  pipelineId: PropTypes.string,
  parentCallbackEditItem: PropTypes.func,
  parentHandleViewSourceActivityLog: PropTypes.func,
  setStateItems: PropTypes.func,
  quietSavePlan: PropTypes.func,
  fetchPlan: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  refreshCount: PropTypes.number,
};


export default PipelineWorkflowItemList;