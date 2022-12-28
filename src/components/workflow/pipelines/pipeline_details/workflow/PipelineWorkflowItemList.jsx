import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { SteppedLineTo } from "react-lineto";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { faPlusSquare, faCaretSquareDown, faCaretSquareUp, faCopy } from "@fortawesome/pro-light-svg-icons";
import PipelineWorkflowItem from "./PipelineWorkflowItem";
import { pipelineValidationHelper } from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function PipelineWorkflowItemList(
  {
    pipeline,
    lastStep,
    editWorkflow,
    pipelineId,
    parentCallbackEditItem,
    quietSavePlan,
    fetchPlan,
    parentWorkflowStatus,
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
  }, [JSON.stringify(lastStep), JSON.stringify(pipeline.workflow)]);


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
          <div className={"m-auto"}>
          <OverlayTrigger
            placement="top"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip({message: "Move lower step up one position"})}>
            <IconBase icon={faCaretSquareUp} iconSize={"lg"}
                      className={index === 0 ? "fa-disabled" : "pointer dark-grey"}
                      onClickFunction={() => {
                        handleMoveStep(item._id, index, "up");
                      }}/>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip({message: "Add new step here"})}>
            <IconBase icon={faPlusSquare}
                      iconSize={"lg"}
                      className={"green pointer ml-2 mr-1"}
                      onClickFunction={() => {
                        handleAddStep(item._id, index);
                      }}/>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip({message: "Copy previous step"})}>
            <IconBase icon={faCopy}
                      iconSize={"lg"}
                      className={"yellow pointer ml-1 mr-2"}
                      onClickFunction={() => {
                        handleCopyStep(item, index);
                      }}/>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip({message: "Move upper step down one position"})}>
            <IconBase icon={faCaretSquareDown} iconSize={"lg"}
                      className={index === pipelineSteps.length - 1 ? "fa-disabled" : "pointer dark-grey"}
                      onClickFunction={() => {
                        handleMoveStep(item._id, index, "down");
                      }}/>
          </OverlayTrigger>
          </div>
        </div>
      );
    }

    return (
      <>
        <SteppedLineTo
          from={"step-" + item._id}
          to={"step-" + index}
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
    <>
      {pipelineSteps && pipelineSteps.map((item, index) => (
        <div
          key={index}
          className={isSaving ? "fa-disabled" : ""}
        >
          <div
            className={"p-1 workflow-module-container workflow-module-container-width mx-auto " + setStepStatusClass(item)}
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              borderRadius: ".22rem",
            }}
          >
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
              parentWorkflowStatus={parentWorkflowStatus}
              toolIdentifier={getToolIdentifierForStep(item?.tool?.tool_identifier)}
              loadPipeline={fetchPlan}
            />
          </div>
          {getPipelineWorkflowItemControls(item, index)}
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
  quietSavePlan: PropTypes.func,
  fetchPlan: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};


export default PipelineWorkflowItemList;