import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PipelineHelpers from "../../pipelineHelpers";
import PipelineActions from "../../pipeline-actions";
import {
  faPlay,
  faSync,
  faSpinner,
  faStopCircle,
  faRedo,
  faInfoCircle, faRepeat1, faClock,
} from "@fortawesome/pro-light-svg-icons";
import CancelPipelineQueueConfirmationOverlay
  from "components/workflow/pipelines/pipeline_details/queuing/cancellation/CancelPipelineQueueConfirmationOverlay";
import commonActions from "../../../common/common.actions";
import InformaticaPipelineRunAssistantOverlay
  from "components/workflow/run_assistants/informatica/InformaticaPipelineRunAssistantOverlay";
import ApigeePipelineRunAssistantOverlay from "components/workflow/run_assistants/apigee/ApigeePipelineRunAssistantOverlay";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import SapCpqPipelineRunAssistantOverlay from "../../run_assistants/sap_cpq/SapCpqPipelineRunAssistantOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineStartWizard from "components/workflow/pipelines/pipeline_details/PipelineStartWizard";
import PipelineUserApprovalButton from "components/workflow/pipelines/action_controls/PipelineUserApprovalButton";
import PipelineStopButton from "components/workflow/pipelines/action_controls/PipelineStopButton";

const delayCheckInterval = 15000;
let internalRefreshCount = 1;

function PipelineActionControls(
  {
    pipeline,
    isLoading,
    disabledActionState,
    fetchData,
  }) {
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [resetPipeline, setResetPipeline] = useState(false);
  const [startPipeline, setStartPipeline] = useState(false);
  const [stopPipeline, setStopPipeline] = useState(false);
  const [isApprovalGate, setIsApprovalGate] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const [statusMessageBody, setStatusMessageBody] = useState("");
  const [hasQueuedRequest, setHasQueuedRequest] = useState(false);
  const [queueingEnabled, setQueueingEnabled] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    userData,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  /***
   * Used to get status of Pipeline Queuing Flag specifically
   * @returns {Promise<*>}
   */
  const getFeatureFlags = async () => {
    const response = await commonActions.getFeatureFlagsV2(getAccessToken, cancelTokenSource);
    return response?.data;
  };

  useEffect(() => {
    loadData(pipeline).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    if (workflowStatus === "paused") {
      setStatusMessage("This pipeline is currently paused awaiting user response");
      setStatusMessageBody("A paused pipeline requires a user to review and either approve or acknowledge completed actions in order to proceed.");
    } else {
      setStatusMessage(false);
      setStatusMessageBody("");
    }
  }, [workflowStatus, JSON.stringify(pipeline.workflow)]);


  useEffect(() => {
    if (pipeline && startPipeline === true) {
      const state = pipeline?.workflow?.last_step?.status;

      if (state !== "running") {
        handleDelayCheckRefresh(pipeline?._id);
      }
      else {
        setStartPipeline(false);
      }
    }
  }, [pipeline]);

  const loadData = async (pipeline) => {
    // TODO: With the below check this is unnecessary-- leaving in for now but something to look at later
    if (pipeline?.workflow === undefined) {
      return;
    }

    if (pipeline?.workflow?.last_step === undefined) {
      setWorkflowStatus("stopped");
      return;
    }

    const status = DataParsingHelper.parseNestedString(pipeline, "workflow.last_step.status");

    //check for queued requests
    if (status === "running") {
      await checkPipelineQueueStatus();
    }

    if (status !== "running" && hasQueuedRequest) {
      delayRefresh();
    }

    const isPaused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");

    if (status === "stopped" && isPaused === true) {
      setWorkflowStatus("paused");

      const parsedPipelineStepToolIdentifier = PipelineHelpers.getPendingApprovalStepToolIdentifier(pipeline);
      //if step set currently running is an approval step, flag that
      if (parsedPipelineStepToolIdentifier) {
          const approvalGateIdentifiers = [toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL, toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION];
          setIsApprovalGate(approvalGateIdentifiers.includes(parsedPipelineStepToolIdentifier));
      }

      return;
    }

    setWorkflowStatus(status);
  };

  const checkPipelineQueueStatus = async () => {
    const featureFlags = await getFeatureFlags();
    const orchestration = featureFlags?.orchestration;

    setQueueingEnabled(orchestration?.enableQueuing);

    if (orchestration?.enableQueuing) {
      const queuedRequest = await PipelineActions.getQueuedPipelineRequestV2(getAccessToken, cancelTokenSource, pipeline?._id);
      const isQueued = typeof queuedRequest?.data === "object" && Object.keys(queuedRequest?.data)?.length > 0;
      setHasQueuedRequest(isQueued);
    }
  };

  // button handlers
  const handleResetWorkflowClick = async (pipelineId) => {
    setResetPipeline(true);
    setWorkflowStatus("stopped");
    await resetPipelineState(pipelineId);
    await fetchData();
    setResetPipeline(false);
    setStartPipeline(false);
    await checkPipelineQueueStatus();
  };

  const handleStopWorkflowClick = async (pipelineId) => {
    setResetPipeline(true);
    setWorkflowStatus("stopped");
    await stopPipelineRun(pipelineId);
    await fetchData();
    setResetPipeline(false);
    setStartPipeline(false);
    await PipelineActions.deleteQueuedPipelineRequestV2(getAccessToken, cancelTokenSource, pipelineId);
    await checkPipelineQueueStatus();
  };

  const handleRefreshClick = async () => {
    await fetchData();
    await checkPipelineQueueStatus();
  };

  const stopPipelineRun = async (pipelineId) => {
    try {
      setStopPipeline(true);
      await PipelineActions.stopPipelineV2(getAccessToken, cancelTokenSource, pipelineId);
    }
    catch (error) {
      if (isMounted.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue stopping this pipeline");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setStopPipeline(false);
        setStartPipeline(false);
      }
    }
  };

  const resetPipelineState = async (pipelineId) => {
    try {
      setStopPipeline(true);
      await PipelineActions.resetPipelineV2(getAccessToken, cancelTokenSource, pipelineId);
    }
    catch (error) {
      if (isMounted.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue resetting this pipeline");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setStopPipeline(false);
        setStartPipeline(false);
      }
    }
  };

  const runPipeline = async (pipelineId) => {
    try {
      setStartPipeline(true);
      toastContext.showInformationToast("A request to start this pipeline has been submitted.", 20);
      const response = await PipelineActions.runPipelineV2(getAccessToken, cancelTokenSource, pipelineId);
      const message = response?.data?.message;

      if (hasStringValue(message) === true) {
        toastContext.showInformationToast(message, 20);
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue starting this pipeline");
      }
    }
    finally {
      handlePipelineStatusRefresh(pipelineId);
    }
  };

  /***
   * Used primiarily to call run API again to register a queued start request.  Unlike normal runPipeline, it doesn't impact
   * refresh patterns on the page
   * @param pipelineId
   * @returns {Promise<void>}
   */
  const runPipelineLight = async (pipelineId) => {
    try {
      toastContext.showInformationToast("A request to re-start this pipeline has been added to the queue.  Upon successful completion of this pipeline run, the pipeline will start again.", 20);
      await PipelineActions.runPipelineV2(getAccessToken, cancelTokenSource, pipelineId);
      setHasQueuedRequest(true);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const startNewPipelineRun = async (pipelineId) => {
    try {
      setStartPipeline(true);
      toastContext.showInformationToast("A request to start this pipeline from the start has been submitted.  Resetting pipeline status and then the pipeline will begin momentarily.", 20);
      await PipelineActions.triggerPipelineNewStartV2(getAccessToken, cancelTokenSource, pipelineId);
      setHasQueuedRequest(true);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      handlePipelineStatusRefresh(pipelineId);
    }
  };

  const handleResumeWorkflowClick = async (pipelineId) => {
    try {
      setStartPipeline(true);
      setWorkflowStatus("running");
      toastContext.showInformationToast("A request to resume this pipeline has been submitted.  It will begin shortly.", 20);
      await PipelineActions.resumePipelineV2(getAccessToken, cancelTokenSource, pipelineId);
    }
    catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      handlePipelineStatusRefresh(pipelineId);
    }
  };

  const handlePipelineStatusRefresh = (pipelineId) => {
    console.log("Initialized pipeline startup status check");
    internalRefreshCount = 1;

    console.log(`Scheduling startup status check followup for Pipeline: ${pipelineId}, counter: ${internalRefreshCount}, interval: ${delayCheckInterval} `);
    handleDelayCheckRefresh(pipelineId);
  };

  const handleDelayCheckRefresh = (pipelineId) => {
    setTimeout(async function() {
      internalRefreshCount++;
      console.log(`Scheduling startup status check followup for Pipeline: ${pipelineId}, counter: ${internalRefreshCount}, interval: ${delayCheckInterval} `);
      await fetchData();
    }, delayCheckInterval);
  };

  const delayRefresh = () => {
    setTimeout(async function() {
      await fetchData();
    }, delayCheckInterval);
  };

  const launchPipelineStartWizard = (pipelineOrientation, pipelineType, pipelineId) => {
    //console.log("launching wizard");
    //console.log("pipelineOrientation ", pipelineOrientation);
    //console.log("pipelineType ", pipelineType);
    //console.log("pipelineId ", pipelineId);

    toastContext.showOverlayPanel(
      <PipelineStartWizard
        pipelineType={pipelineType}
        pipelineOrientation={pipelineOrientation}
        pipelineId={pipelineId}
        pipeline={pipeline}
        handleClose={handlePipelineStartWizardClose}
        handlePipelineWizardRequest={handlePipelineWizardRequest}
      />,
    );
  };

  const showCancelQueueOverlay = () => {
    toastContext.showOverlayPanel(
      <CancelPipelineQueueConfirmationOverlay
        pipeline={pipeline}
        setHasQueuedRequest={setHasQueuedRequest}
      />,
    );
  };

  const handlePipelineStartWizardClose = () => {
    //console.log("closing wizard");
    toastContext.clearOverlayPanel();
  };

  const handlePipelineWizardRequest = async (pipelineId, restartBln) => {
    handlePipelineStartWizardClose();
    if (restartBln) {
      console.log("Starting pipeline from beginning: clearing current pipeline status and activity");
      /*await resetPipelineState(pipelineId);
      await runPipeline(pipelineId);*/
      await startNewPipelineRun(pipelineId);
      return;
    }

    await handleResumeWorkflowClick(pipelineId);
  };

  const launchInformaticaRunAssistant = (pipelineOrientation, pipelineId) => {
    toastContext.showOverlayPanel(
      <InformaticaPipelineRunAssistantOverlay
        pipeline={pipeline}
        startPipelineRunFunction={() => triggerInformaticaPipelineRun(pipelineOrientation, pipelineId)}
      />
    );
  };

  const launchApigeeRunAssistant = (pipelineOrientation, pipelineId) => {
    toastContext.showOverlayPanel(
      <ApigeePipelineRunAssistantOverlay
        pipeline={pipeline}
        startPipelineRunFunction={() => triggerInformaticaPipelineRun(pipelineOrientation, pipelineId)}
      />
    );
  };

  const launchSapCpqRunAssistant = (pipelineOrientation, pipelineId) => {
    toastContext.showOverlayPanel(
        <SapCpqPipelineRunAssistantOverlay
            pipeline={pipeline}
            startPipelineRunFunction={() => triggerInformaticaPipelineRun(pipelineOrientation, pipelineId)}
        />
    );
  };


  // TODO: Handle more gracefully
  const triggerInformaticaPipelineRun = async (pipelineOrientation, pipelineId) => {
    if (pipelineOrientation === "start") {
      console.log("starting pipeline from scratch");
      await runPipeline(pipelineId);
    } else {
      console.log("clearing pipeline activity and then starting over");
      await resetPipelineState(pipelineId);
      await runPipeline(pipelineId);
    }
  };

  // TODO: Put into a separate run button
  const handleRunPipelineClick = async (pipelineId) => {
    //check type of pipeline to determine if pre-flight wizard is required
    // is pipeline at the beginning or stopped midway or end of prior?
    const pipelineTypes = DataParsingHelper.parseArray(pipeline.type, []);
    //for now type is just the first entry
    const pipelineType = DataParsingHelper.parseString(pipelineTypes[0], "");

    let pipelineOrientation = "start";
    const stoppedStepId = DataParsingHelper.parseNestedMongoDbId(pipeline, "workflow.last_step.step_id");
    //what step are we currently on in the pipeline: first, last or middle?
    if (DataParsingHelper.isValidMongoDbId(stoppedStepId) === true) {
      const stepIndex = PipelineHelpers.getStepIndex(pipeline, stoppedStepId);
      console.log("current resting step index: ", stepIndex);
      if (stepIndex + 1 === Object.keys(pipeline.workflow.plan).length) {
        pipelineOrientation = "end";
      } else {
        pipelineOrientation = "middle";
      }
    }

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
        launchPipelineStartWizard(pipelineOrientation, pipelineType, pipelineId);
      } else { //this is starting from beginning:
        if (pipelineOrientation === "start") {
          console.log("starting pipeline from scratch");
          await runPipeline(pipelineId);
        } else {
          console.log("clearing pipeline activity and then starting over");
          await resetPipelineState(pipelineId);
          await runPipeline(pipelineId);
        }
      }
    }
  };

  const getWarningMessage = () => {
    // TODO: Validate value
    if (statusMessage) {
      return (
        <div className="warning-theme warning-text text-left">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: statusMessageBody })}>
            <IconBase icon={faInfoCircle} className={"mr-1"} style={{ cursor: "help" }} />
          </OverlayTrigger>
          {statusMessage}
        </div>
      );
    }
  };

  // TODO: Make base button components for these in the future
  //  and wire up the functions inside those components to clean up PipelineActionControls
  return (
    <>
      <div className="d-flex flex-fill">

        {getWarningMessage()}
        <div className="flex-fill p-2"></div>
        <div className="text-right btn-group btn-group-sized">
          {workflowStatus === "running" &&
            <PipelineStopButton
              pipeline={pipeline}
              workflowStatus={workflowStatus}
              handleStopWorkflowClick={handleStopWorkflowClick}
              pipelineIsStopping={stopPipeline}
            />
          }

          {workflowStatus === "paused" &&
            <PipelineUserApprovalButton
              loadPipelineFunction={fetchData}
              pipeline={pipeline}
              workflowStatus={workflowStatus}
            />
          }

          {
            (workflowStatus === "stopped" || !workflowStatus) &&
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "Start pipeline from the beginning." })}>
              <Button variant="success"
                      className="btn-default"
                      size="sm"
                      onClick={() => {
                        handleRunPipelineClick(pipeline._id);
                      }}
                      disabled={PipelineRoleHelper.canStartPipeline(userData, pipeline) !== true || disabledActionState || startPipeline || hasQueuedRequest}>
                {startPipeline ? <><IconBase isLoading={true} icon={faSpinner} className={"mr-1"} /> Starting</> :
                  <><IconBase icon={faPlay} className={"mr-1"} /> Start Pipeline</>}
              </Button>
            </OverlayTrigger>
          }

          {
            (queueingEnabled && !hasQueuedRequest) && (workflowStatus === "paused" || workflowStatus === "running") &&
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Request a re-start of this pipeline after the successful completion of the current run." })}>
                <Button variant="success"
                        size="sm"
                        onClick={() => {
                          runPipelineLight(pipeline._id);
                        }}>
                  <IconBase icon={faRepeat1} /> Repeat Once</Button>
              </OverlayTrigger>
          }

          {((workflowStatus === "paused" && !isApprovalGate) ||
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
                    disabled={PipelineRoleHelper.canStartPipeline(userData, pipeline) !== true || disabledActionState || startPipeline}>
                <IconBase isLoading={startPipeline} icon={faRedo} className={ "mr-1"} />
              <span className="d-none d-md-inline">Resume</span></Button>
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
                        handleResetWorkflowClick(pipeline._id);
                      }}
                      disabled={PipelineRoleHelper.canResetPipeline(userData, pipeline) !== true || disabledActionState || startPipeline}>
                  <IconBase isLoading={resetPipeline} icon={faRedo} fixedWidth className="mr-1" />
                <span className="d-none d-md-inline">Reset Pipeline</span></Button>
            </OverlayTrigger>
          }


          {
            hasQueuedRequest &&
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "A queued request to start this pipeline is pending.  Upon successful completion of this run, the pipeline will restart." })}>
              <Button variant="secondary"
                      size="sm"
                      onClick={() => {
                        showCancelQueueOverlay();
                      }}>
                <IconBase icon={faClock} /> Queued Request</Button>
            </OverlayTrigger>
          }


          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Refresh view" })}>
            <Button variant="secondary"
                    size="sm"
                    onClick={() => {
                      handleRefreshClick();
                    }}>
              <IconBase isLoading={isLoading} icon={faSync} /></Button>
          </OverlayTrigger>

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
  disabledActionState: PropTypes.bool,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default PipelineActionControls;
