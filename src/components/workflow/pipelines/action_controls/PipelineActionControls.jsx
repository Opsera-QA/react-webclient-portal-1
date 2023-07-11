import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PipelineHelpers from "../../pipelineHelpers";
import PipelineActions from "../../pipeline-actions";
import { faRedo, faInfoCircle, faRepeat1, faClock } from "@fortawesome/pro-light-svg-icons";
import CancelPipelineQueueConfirmationOverlay from "components/workflow/pipelines/pipeline_details/queuing/cancellation/CancelPipelineQueueConfirmationOverlay";
import InformaticaPipelineRunAssistantOverlay from "components/workflow/run_assistants/informatica/InformaticaPipelineRunAssistantOverlay";
import ApigeePipelineRunAssistantOverlay from "components/workflow/run_assistants/apigee/ApigeePipelineRunAssistantOverlay";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import SapCpqPipelineRunAssistantOverlay from "../../run_assistants/sap_cpq/SapCpqPipelineRunAssistantOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineStartWizard from "components/workflow/pipelines/pipeline_details/PipelineStartWizard";
import PipelineActionControlsUserApprovalButton from "components/workflow/pipelines/action_controls/PipelineActionControlsUserApprovalButton";
import PipelineActionControlsStopButton from "components/workflow/pipelines/action_controls/PipelineActionControlsStopButton";
import PipelineActionControlsRefreshButton from "components/workflow/pipelines/action_controls/PipelineActionControlsRefreshButton";
import {pipelineTypeConstants} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import PipelineActionControlsStartPipelineButton from "components/workflow/pipelines/action_controls/start/PipelineActionControlsStartPipelineButton";
import useGetPlatformFeatureFlags from "hooks/platform/useGetPlatformFeatureFlags";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import {buttonLabelHelper} from "temp-library-components/helpers/label/button/buttonLabel.helper";
import PipelineActionControlButtonBase from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import {sleep} from "utils/helpers";
import PipelineStartConfirmationOverlay from "components/workflow/pipelines/PipelineStartConfirmationOverlay";

const PIPELINE_ACTION_STATES = {
  READY: "ready",
  STOPPING: "stopping",
  RESETTING: "resetting",
  STARTING: "starting",
};

const approvalGateIdentifiers = [toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL, toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION];

function PipelineActionControls(
  {
    pipeline,
    workflowStatus,
    isLoading,
    fetchData,
    isQueued,
    runCount,
  }) {
  const [resetPipeline, setResetPipeline] = useState(false);
  const [startPipeline, setStartPipeline] = useState(false);
  const [stopPipeline, setStopPipeline] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    userData,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();
  const {
    orchestrationFeatureFlags,
    enabledServices,
  } = useGetPlatformFeatureFlags();
  const pipelineActionsHook = usePipelineActions();

  const delayedRefresh = async () => {
    await sleep(5000);
    await fetchData();
  };

  useEffect(() => {
    if (workflowStatus !== "stopped") {
      setStartPipeline(false);
    } else {
      setStopPipeline(false);
    }

    setResetPipeline(false);
  }, [workflowStatus]);

  useEffect(() => {
    setStartPipeline(false);
  }, [runCount]);


  const handleRefreshClick = async () => {
    await fetchData();
  };

  const stopPipelineRun = async () => {
    try {
      setStopPipeline(true);
      await PipelineActions.stopPipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      await PipelineActions.deleteQueuedPipelineRequestV2(getAccessToken, cancelTokenSource, pipeline?._id);
      await delayedRefresh();
    }
    catch (error) {
      setStopPipeline(true);
      if (isMounted.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue stopping this pipeline");
      }
    }
    finally {
      // TODO: Remove
      if (isMounted?.current === true) {
        setStopPipeline(false);
        setStartPipeline(false);
        setResetPipeline(false);
      }
    }
  };

  const resetPipelineState = async (silentReset) => {
    try {
      setResetPipeline(true);
      await pipelineActionsHook.resetPipeline(
        pipeline?._id,
        silentReset,
      );
      await delayedRefresh();
    }
    catch (error) {
      setResetPipeline(false);
      if (isMounted.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue resetting this pipeline");
      }
    }
    finally {
      // TODO: Remove
      if (isMounted?.current === true) {
        setStopPipeline(false);
        setStartPipeline(false);
        setResetPipeline(false);
      }
    }
  };

  const runPipeline = async (pipelineId, pipelineRunSettingsModel) => {
    try {
      const postBody = {};

      if (pipelineRunSettingsModel && enabledServices?.dynamicSettings === true) {
        const settings = {};
        const parsedDynamicBranch = DataParsingHelper.parseString(pipelineRunSettingsModel?.getData("branch"));

        if (parsedDynamicBranch) {
          settings.branch = parsedDynamicBranch;
        }

        const parsedSteps = DataParsingHelper.parseArray(pipelineRunSettingsModel?.getData("steps"));

        if (parsedSteps) {
          settings.steps = parsedSteps;
        }

        const parsedSettings = DataParsingHelper.parseObject(settings);

        if (parsedSettings) {
          postBody.settings = parsedSettings;
        }
      }

      setStartPipeline(true);
      toastContext.showInformationToast("A request to start this pipeline has been submitted.", 20);
      const response = await PipelineActions.runPipelineV2(
        getAccessToken,
        cancelTokenSource,
        pipeline?._id,
        postBody,
      );
      const message = response?.data?.message;

      if (hasStringValue(message) === true) {
        toastContext.showInformationToast(message, 20);
        await delayedRefresh();
      }
    }
    catch (error) {
      setStartPipeline(false);
      if (isMounted.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue starting this pipeline");
      }
    }
  };

  const resetAndRunPipeline = async (pipelineRunSettingsModel) => {
    await resetPipelineState(true);
    await runPipeline(undefined, pipelineRunSettingsModel);
  };
  /***
   * Used primiarily to call run API again to register a queued start request.  Unlike normal runPipeline, it doesn't impact
   * refresh patterns on the page
   * @param pipelineId
   * @returns {Promise<void>}
   */
  const runPipelineLight = async () => {
    try {
      setStartPipeline(true);
      toastContext.showInformationToast("A request to re-start this pipeline has been added to the queue.  Upon successful completion of this pipeline run, the pipeline will start again.", 20);
      await PipelineActions.runPipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      await delayedRefresh();
    }
    catch (error) {
      setStartPipeline(false);
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const startNewPipelineRun = async () => {
    try {
      setStartPipeline(true);
      toastContext.showInformationToast("A request to start this pipeline from the start has been submitted.  Resetting pipeline status and then the pipeline will begin momentarily.", 20);
      await PipelineActions.triggerPipelineNewStartV2(getAccessToken, cancelTokenSource, pipeline?._id);
      await delayedRefresh();
    }
    catch (error) {
      setStartPipeline(false);
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const handleResumeWorkflowClick = async () => {
    try {
      setStartPipeline(true);
      toastContext.showInformationToast("A request to resume this pipeline has been submitted.  It will begin shortly.", 20);
      await PipelineActions.resumePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      await delayedRefresh();
    }
    catch (error) {
      setStartPipeline(false);
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const launchPipelineStartWizard = (pipelineOrientation, pipelineType) => {
    //console.log("launching wizard");
    //console.log("pipelineOrientation ", pipelineOrientation);
    //console.log("pipelineType ", pipelineType);
    //console.log("pipelineId ", pipelineId);

    toastContext.showOverlayPanel(
      <PipelineStartWizard
        pipelineType={pipelineType}
        pipelineOrientation={pipelineOrientation}
        pipelineId={pipeline?._id}
        pipeline={pipeline}
        handlePipelineWizardRequest={handlePipelineWizardRequest}
      />,
    );
  };

  const showCancelQueueOverlay = () => {
    toastContext.showOverlayPanel(
      <CancelPipelineQueueConfirmationOverlay
        pipeline={pipeline}
      />,
    );
  };

  const handlePipelineWizardRequest = async (pipelineId, restartBln) => {
    toastContext.clearOverlayPanel();

    if (restartBln) {
      console.log("Starting pipeline from beginning: clearing current pipeline status and activity");
      await startNewPipelineRun(pipeline?._id);
      return;
    }

    await handleResumeWorkflowClick(pipeline?._id);
  };

  const launchInformaticaRunAssistant = (pipelineOrientation) => {
    toastContext.showOverlayPanel(
      <InformaticaPipelineRunAssistantOverlay
        pipeline={pipeline}
        startPipelineRunFunction={() => triggerInformaticaPipelineRun(pipelineOrientation, pipeline?._id)}
      />
    );
  };

  const launchApigeeRunAssistant = (pipelineOrientation) => {
    toastContext.showOverlayPanel(
      <ApigeePipelineRunAssistantOverlay
        pipeline={pipeline}
        startPipelineRunFunction={() => triggerInformaticaPipelineRun(pipelineOrientation, pipeline?._id)}
      />
    );
  };

  const launchSapCpqRunAssistant = (pipelineOrientation) => {
    toastContext.showOverlayPanel(
      <SapCpqPipelineRunAssistantOverlay
        pipeline={pipeline}
        startPipelineRunFunction={() => triggerInformaticaPipelineRun(pipelineOrientation, pipeline?._id)}
      />
    );
  };


  // TODO: Handle more gracefully
  const triggerInformaticaPipelineRun = async (pipelineOrientation) => {
    if (pipelineOrientation === "start") {
      console.log("starting pipeline from scratch");
      await runPipeline(pipeline?._id);
    } else {
      console.log("clearing pipeline activity and then starting over");
      await resetPipelineState(true);
      await runPipeline(pipeline?._id);
    }
  };

  // TODO: Put into a separate run button
  const handleRunPipelineClick = async (pipelineRunSettingsModel) => {
    const pipelineId = pipeline?._id;
    //check type of pipeline to determine if pre-flight wizard is required
    //for now type is just the first entry
    const pipelineType = pipelineTypeConstants.getTypeForTypesArray(pipeline?.type);
    const pipelineOrientation = pipelineHelper.getPipelineOrientation(pipeline);

    if (pipelineType === "sfdc") {
      launchPipelineStartWizard(pipelineOrientation, pipelineType, pipelineId);
    }else if (pipelineType === "apigee") {
      launchApigeeRunAssistant(pipelineOrientation, pipelineId);
    } else if (pipelineType === "informatica") {
      launchInformaticaRunAssistant(pipelineOrientation, pipelineId);
    } else if (pipelineType === "sap-cpq") {
      launchSapCpqRunAssistant(pipelineOrientation, pipelineId);
    } else {
      if (pipelineOrientation === "middle") {
        //this is the middle, so pop the new modal to confirm user wants to resume or offer reset/restart
        toastContext.showOverlayPanel(
          <PipelineStartConfirmationOverlay
            pipeline={pipeline}
            handlePipelineStartRequest={resetAndRunPipeline}
            handlePipelineResumeRequest={handleResumeWorkflowClick}
            dynamicSettingsEnabled={enabledServices?.dynamicSettings === true}
          />
        );
      } else { //this is starting from beginning:
        if (pipelineOrientation === "start") {
          console.log("starting pipeline from scratch");
          await runPipeline(pipelineId, pipelineRunSettingsModel);
        } else {
          console.log("clearing pipeline activity and then starting over");
          await resetPipelineState(true);
          await runPipeline(pipelineId, pipelineRunSettingsModel);
        }
      }
    }
  };

  //TODO: Do the workflow status check inside the component and move inline.
  // Separating out for now to avoid causing unexpected issues.
  const getStopButton = () => {
    if (workflowStatus === "running") {
      return (
        <PipelineActionControlsStopButton
          pipeline={pipeline}
          workflowStatus={workflowStatus}
          handleStopWorkflowClick={stopPipelineRun}
          pipelineIsStopping={stopPipeline}
          disabled={startPipeline || resetPipeline}
        />
      );
    }
  };

  //TODO: Do the workflow status check inside the component and move inline.
  // Separating out for now to avoid causing unexpected issues.
  const getRunPipelineButton = () => {
    if (workflowStatus === "stopped") {
      return (
        <PipelineActionControlsStartPipelineButton
          pipeline={pipeline}
          workflowStatus={workflowStatus}
          handleRunPipelineClick={handleRunPipelineClick}
          hasQueuedRequest={isQueued}
          pipelineIsStarting={startPipeline}
          dynamicSettingsEnabled={enabledServices?.dynamicSettings === true}
          pipelineOrientation={pipelineHelper.getPipelineOrientation(pipeline)}
        />
      );
      // } else if (stopPipeline) {
      //   return (
      //     <PipelineActionControlButtonBase
      //       normalText={"Stopping Pipeline"}
      //       busyText={"Stopping Pipeline"}
      //       buttonState={buttonLabelHelper.BUTTON_STATES.BUSY}
      //       disabled={true}
      //       variant={"outline-danger"}
      //     />
      //   );
    } else if (startPipeline) {
      return (
        <PipelineActionControlButtonBase
          normalText={"Starting Pipeline"}
          busyText={"Starting Pipeline"}
          buttonState={buttonLabelHelper.BUTTON_STATES.BUSY}
          disabled={true}
          variant={"outline-dark"}
        />
      );
      // } else if (resetPipeline) {
      //   return (
      //     <PipelineActionControlButtonBase
      //       normalText={"Resetting Pipeline"}
      //       busyText={"Resetting Pipeline"}
      //       buttonState={buttonLabelHelper.BUTTON_STATES.BUSY}
      //       disabled={true}
      //       variant={"outline-dark"}
      //     />
      //   );
    } else if (workflowStatus === "running") {
      return (
        <PipelineActionControlButtonBase
          normalText={"Running"}
          busyText={"Running"}
          buttonState={buttonLabelHelper.BUTTON_STATES.BUSY}
          disabled={true}
          variant={"outline-dark"}
        />
      );
    }
  };

  const getQueueButton = () => {
    if (stopPipeline || startPipeline || resetPipeline) {
      return;
    }

    if (isQueued === true && workflowStatus !== "stopped") {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip({ message: "A queued request to start this pipeline is pending.  Upon successful completion of this run, the pipeline will restart." })}>
          <Button variant="secondary"
            size="sm"
            disabled={startPipeline || stopPipeline || resetPipeline}
            onClick={() => {
              showCancelQueueOverlay();
            }}>
            <IconBase icon={faClock} /> Queued Request</Button>
        </OverlayTrigger>
      );
    }

    if (orchestrationFeatureFlags?.enableQueuing === true && workflowStatus !== "stopped") {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip({ message: "Request a re-start of this pipeline after the successful completion of the current run." })}>
          <Button variant="success"
            size="sm"
            disabled={startPipeline || stopPipeline || resetPipeline}
            onClick={() => {
              runPipelineLight(pipeline._id);
            }}>
            <IconBase icon={faRepeat1} /> Repeat Once</Button>
        </OverlayTrigger>
      );
    }
  };

  if (pipeline == null) {
    return null;
  }

  // TODO: Make base button components for these in the future
  //  and wire up the functions inside those components to clean up PipelineActionControls
  return (
    <>
      <div className={"d-flex"}>
        <div className="text-right btn-group btn-group-sized">
          {getRunPipelineButton()}
          {getStopButton()}

          {workflowStatus === "paused" && startPipeline !== true && resetPipeline !== true &&
            <PipelineActionControlsUserApprovalButton
              pipeline={pipeline}
              workflowStatus={workflowStatus}
              setPipelineStarting={setStartPipeline}
              disabled={startPipeline || stopPipeline || resetPipeline}
            />
          }

          {getQueueButton()}

          {((workflowStatus === "paused" && approvalGateIdentifiers.includes(PipelineHelpers.getPendingApprovalStepToolIdentifier(pipeline)) === false) ||
              (workflowStatus === "stopped" &&
                pipeline.workflow.last_run?.run_count &&
                pipeline.workflow.run_count !== pipeline.workflow.last_run.run_count &&
                pipeline.workflow.last_step?.step_id !== "")) &&
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "Will resume the pipeline on the next step.  It will not rerun the last step, even if that step failed. To clear a failed step, reset the pipeline and run it from the start." })}>
              <Button variant="success"
                className="btn-default"
                size="sm"
                onClick={() => {
                  handleResumeWorkflowClick(pipeline._id);
                }}
                disabled={PipelineRoleHelper.canStartPipeline(userData, pipeline) !== true || startPipeline || stopPipeline || resetPipeline}>
                <IconBase isLoading={startPipeline} icon={faRedo} className={ "mr-1"} />
                <span className="d-none d-sm-inline d-md-inline">Resume</span></Button>
            </OverlayTrigger>}

          {
            workflowStatus !== "running" &&
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "Reset current pipeline run state." })}>
              <Button variant="secondary"
                className="btn-default"
                size="sm"
                onClick={() => {
                  resetPipelineState();
                }}
                disabled={PipelineRoleHelper.canResetPipeline(userData, pipeline) !== true || startPipeline || stopPipeline || resetPipeline}>
                <IconBase isLoading={resetPipeline} icon={faRedo} fixedWidth className="mr-1" />
                <span className="d-none d-sm-inline d-md-inline">Reset Pipeline</span></Button>
            </OverlayTrigger>
          }
          <PipelineActionControlsRefreshButton
            handleRefreshWorkflowClick={handleRefreshClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>);
}


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

PipelineActionControls.propTypes = {
  pipeline: PropTypes.object,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
  workflowStatus: PropTypes.string,
  isQueued: PropTypes.bool,
  runCount: PropTypes.number,
};

export default PipelineActionControls;
