import React from "react";
import PropTypes from "prop-types";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import IconBase from "components/common/icons/IconBase";
import {faCheckCircle, faOctagon, faPen, faSpinner, faTimesCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineStepWorkflowStepAwaitingApprovalStepIcon
  from "components/workflow/pipelines/pipeline_details/workflow/item/icon/PipelineStepWorkflowStepAwaitingApprovalStepIcon";
import PipelineWorkflowStepIncompleteStepIcon
  from "components/workflow/pipelines/pipeline_details/workflow/item/icon/PipelineWorkflowStepIncompleteStepIcon";
import PipelineStepWorkflowStepDisabledStepIcon
  from "components/workflow/pipelines/pipeline_details/workflow/item/icon/PipelineStepWorkflowStepDisabledStepIcon";
import PipelineStepWorkflowStepDeleteStepButton
  from "components/workflow/pipelines/pipeline_details/workflow/item/button/PipelineStepWorkflowStepDeleteStepButton";
import StepToolHelpIcon from "components/workflow/pipelines/pipeline_details/workflow/StepToolHelpIcon";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

// TODO: Rewrite and cleanup
export default function PipelineStepCardHeader(
  {
    pipeline,
    pipelineStep,
    pipelineStepId,
    isEditingWorkflow,
    loadPipeline,
    handleEditClick,
    itemState,
    isToolSet,
    isLoading,
    handleViewStepActivityLogClick,
    pipelineId,
    currentStatus,
    className,
  }) {
  const orchestrationState = pipelineHelper.getStepStatusForPipeline(pipeline, pipelineStepId);

  // TODO: Make separate component
  const getStepDefinitionEditButton = () => {
    const mongoDbId = DataParsingHelper.parseMongoDbId(pipelineStepId);

    if (mongoDbId && (isEditingWorkflow || !isToolSet)) {
      return (
        <OverlayIconBase
          icon={faPen}
          className={"text-muted ml-2"}
          overlayBody={"Step Setup"}
          onClickFunction={() =>  handleEditClick("step", pipelineStep.tool, pipelineStepId, pipelineStep)}
        />
      );
    }
  };

  // TODO: Make separate components
  const getPipelineStepStateIcon = () => {
    if (isToolSet && !isEditingWorkflow && !isLoading) {
      return (
        <>
          <OverlayIconBase
            icon={faTimesCircle}
            className={"ml-2 red"}
            onClickFunction={() => {
              handleViewStepActivityLogClick(pipelineId, pipelineStep.tool.tool_identifier, pipelineStep._id, currentStatus.activity_id);
            }}
            overlayBody={"View Errors"}
            visible={itemState === "failed"}
          />
          <OverlayIconBase
            icon={faOctagon}
            className={"ml-2 danger-red"}
            onClickFunction={() => {
              handleViewStepActivityLogClick(pipelineId, pipelineStep.tool.tool_identifier, pipelineStep._id, currentStatus.activity_id);
            }}
            overlayBody={"The last run of this pipeline was stopped while this step was running."}
            visible={itemState === "stopped"}
          />
          <OverlayIconBase
            icon={faCheckCircle}
            className={"ml-2 green"}
            onClickFunction={() => {
              handleViewStepActivityLogClick(pipelineId, pipelineStep.tool.tool_identifier, pipelineStep._id, currentStatus.activity_id);
            }}
            overlayBody={"View last completed log"}
            visible={itemState === "completed"}
          />
          <OverlayIconBase
            icon={faSpinner}
            className={"ml-2 green"}
            onClickFunction={() => {
              handleViewStepActivityLogClick(pipelineId, pipelineStep.tool.tool_identifier, pipelineStep._id, currentStatus.activity_id);
            }}
            overlayBody={"View running step configuration"}
            visible={itemState === "running"}
          />
          <PipelineStepWorkflowStepAwaitingApprovalStepIcon
            pipelineStepState={itemState}
            className={"ml-2 red"}
          />
          <PipelineWorkflowStepIncompleteStepIcon
            className={"ml-2 yellow"}
            pipelineStep={pipelineStep}
          />
          <PipelineStepWorkflowStepDisabledStepIcon
            pipelineStep={pipelineStep}
            className={"ml-2 dark-grey"}
          />
        </>
      );
    }
  };

  return (
    <div
      className={className}
      style={{
        fontSize: "13px",
        letterSpacing: "0.6px",
        minHeight: "20px",
        height: "20px",
        maxHeight: "20px",
      }}
    >
      <div className={"w-100 d-flex justify-content-between"}>
        <div className={"w-100 d-flex"}>
          <div className={"ml-auto title-text-6 upper-case-first d-flex"}>
            <div className={"ml-auto d-flex mr-1"}>
              <IconBase
                isLoading={isLoading}
                className={"green"}
              />

              {getPipelineStepStateIcon()}

              <PipelineStepWorkflowStepDeleteStepButton
                pipeline={pipeline}
                pipelineStep={pipelineStep}
                className={"ml-2"}
                inWorkflowEditMode={isEditingWorkflow}
                loadPipelineFunction={loadPipeline}
              />
              {getStepDefinitionEditButton()}
              <StepToolHelpIcon
                className={"ml-2"}
                tool={pipelineStep?.tool?.tool_identifier}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PipelineStepCardHeader.propTypes = {
  pipeline: PropTypes.object,
  pipelineStepId: PropTypes.string,
  pipelineStep: PropTypes.object,
  isEditingWorkflow: PropTypes.bool,
  loadPipeline: PropTypes.func,
  handleEditClick: PropTypes.func,
  itemState: PropTypes.string,
  isToolSet: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleViewStepActivityLogClick: PropTypes.func,
  pipelineId: PropTypes.string,
  currentStatus: PropTypes.object,
  className: PropTypes.string,
};