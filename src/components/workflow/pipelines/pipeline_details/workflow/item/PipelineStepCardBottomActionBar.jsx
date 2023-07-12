import React from "react";
import PropTypes from "prop-types";
import {faArchive, faTerminal, faCog} from "@fortawesome/pro-light-svg-icons";
import PipelineStepWorkflowItemViewSettingsButton
  from "components/workflow/pipelines/pipeline_details/workflow/item/button/PipelineStepWorkflowItemViewSettingsButton";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import PipelineStepWorkflowItemEditNotificationSettingsButton
  from "components/workflow/pipelines/pipeline_details/workflow/item/button/PipelineStepWorkflowItemEditNotificationSettingsButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineStepLiveLogOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepLiveLogOverlay";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function renderTooltip(props) {
  const {message} = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

// TODO: Move functions into here, cleanup. THis is just a copy currently and hasn't been refactored.
export default function PipelineStepCardBottomActionBar(
  {
    pipeline,
    step,
    isToolSet,
    loadPipeline,
    isEditingWorkflow,
    parentWorkflowStatus,
    toolIdentifier,
    itemState,
    handleEditClick,
    handleViewStepActivityLogClick,
    pipelineId,
    runCount,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const showLiveLogOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineStepLiveLogOverlay
        pipelineId={pipelineId}
        stepId={step._id}
        itemState={itemState}
        runCount={runCount}
        tool_identifier={toolIdentifier}
      />
    );
  };

  // TODO: Make separate icon component
  const getActivityLogViewerIcon = () => {
    if (itemState !== "running") {
      return (
        <OverlayTrigger
          placement="top"
          delay={{show: 250, hide: 400}}
          overlay={renderTooltip({message: "View Step Activity Logs"})}>
          <div>
            <IconBase icon={faArchive}
                      className={"text-muted mx-1 pointer"}
                      onClickFunction={() => {
                        handleViewStepActivityLogClick(pipelineId, step.tool.tool_identifier, step._id);
                      }}/>
          </div>
        </OverlayTrigger>
      );
    }

    if (DataParsingHelper.parseNestedBoolean(toolIdentifier, "properties.isLiveStream") === true) {
      return (
        <OverlayTrigger
          placement="top"
          delay={{show: 250, hide: 400}}
          overlay={renderTooltip({message: "View Running Tool Activity (if available)"})}>
          <div>
            <IconBase
              icon={faTerminal}
              className={"green mx-1 pointer"}
              onClickFunction={() => showLiveLogOverlay()}
            />
          </div>
        </OverlayTrigger>
      );
    }
  };

  if (isEditingWorkflow === true) {
    return null;
  }

  return (
    <div className={"ml-auto d-flex"}>
      {isToolSet === true &&
        <>
          <PipelineStepWorkflowItemViewSettingsButton
            editingWorkflow={isEditingWorkflow}
            pipeline={pipeline}
            step={step}
          />
          {getActivityLogViewerIcon()}
          <PipelineStepWorkflowItemEditNotificationSettingsButton
            pipeline={pipeline}
            step={step}
            editingWorkflow={isEditingWorkflow}
            pipelineStatus={parentWorkflowStatus}
          />
        </>}
      {parentWorkflowStatus !== "running" && parentWorkflowStatus !== "paused" ? //if the overall pipeline is in a running/locked state
        <>
          <OverlayTrigger
            placement="top"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip({message: "Configure Step Settings"})}>
            <div>
              <IconBase icon={faCog}
                        className={"text-muted mx-1 pointer"}
                        onClickFunction={() => {
                          handleEditClick("tool", step.tool, step._id, step);
                        }}
              />
            </div>
          </OverlayTrigger>
        </>
        :
        <>
          <OverlayTrigger
            placement="top"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip({message: "Cannot access settings while pipeline is running"})}>
            <div>
              <IconBase icon={faCog}
                        className={"text-muted mx-1"}/>
            </div>
          </OverlayTrigger>
        </>}
    </div>
  );
}

PipelineStepCardBottomActionBar.propTypes = {
  pipeline: PropTypes.object,
  step: PropTypes.object,
  loadPipeline: PropTypes.func,
  isEditingWorkflow: PropTypes.bool,
  parentWorkflowStatus: PropTypes.string,
  isToolSet: PropTypes.bool,
  runCount: PropTypes.number,
  toolIdentifier: PropTypes.string,
  itemState: PropTypes.string,
  handleEditClick: PropTypes.func,
  handleViewStepActivityLogClick: PropTypes.func,
  pipelineId: PropTypes.string,
};