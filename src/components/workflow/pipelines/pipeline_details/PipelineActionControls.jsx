import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "components/common/modal/modal";
import ApprovalModal from "../../approvalModal";
import PipelineStartWizard from "./PipelineStartWizard";
import PipelineHelpers from "../../pipelineHelpers";
import PipelineActions from "../../pipeline-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faSync,
  faSpinner,
  faStopCircle,
  faRedo,
  faFlag, faInfoCircle, faRepeat1, faClock,
} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import FreeTrialPipelineWizard from "components/workflow/wizards/deploy/freetrialPipelineWizard";
import WorkflowAuthorizedActions from "./workflow/workflow-authorized-actions";
import pipelineHelpers from "../../pipelineHelpers";
import axios from "axios";
import pipelineActions from "../../pipeline-actions";
import CancelPipelineQueueConfirmationOverlay
  from "components/workflow/pipelines/pipeline_details/queuing/cancellation/CancelPipelineQueueConfirmationOverlay";
import commonActions from "../../../common/common.actions";
import InformaticaPipelineRunAssistantOverlay
  from "components/workflow/run_assistants/informatica/InformaticaPipelineRunAssistantOverlay";

const delayCheckInterval = 8000;

function PipelineActionControls({
          pipeline,
          customerAccessRules,
          disabledActionState,
          fetchData,
          fetchActivityLogs,
        }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [resetPipeline, setResetPipeline] = useState(false);
  const [startPipeline, setStartPipeline] = useState(false);
  const [stopPipeline, setStopPipeline] = useState(false);
  const [approval, setApproval] = useState(false);
  const [isApprovalGate, setIsApprovalGate] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const [statusMessageBody, setStatusMessageBody] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [freetrialWizardModal, setFreetrialWizardModal] = useState({
    show: false,
    pipelineId: "",
    templateId: "",
    pipelineOrientation: "",
  });
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
  const [hasQueuedRequest, setHasQueuedRequest] = useState(false);
  const [queueingEnabled, setQueueingEnabled] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);


  /***
   * Used to get status of Pipeline Queuing Flag specifically
   * @returns {Promise<*>}
   */
  const getFeatureFlags = async () => {
    const response = await commonActions.getFeatureFlagsV2(getAccessToken, cancelTokenSource);
    return response?.data;
  };


  // TODO: This should be combined with the workflowStatus use effect but don't want to break anything.
  //  After we have time to verify adding this doesn't break it, let's combine them.
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const authorizedAction = (action, owner) => {
    let objectRoles = pipeline?.roles;
    return WorkflowAuthorizedActions.workflowItems(customerAccessRules, action, owner, objectRoles);
  };

  useEffect(() => {
    loadData(pipeline).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    if (workflowStatus === "paused") {
      setStatusMessage("This pipeline is currently paused.");
      setStatusMessageBody("A paused pipeline requires either approval or review of the logs in order to proceed.");
      setApproval(false);
    } else {
      setStatusMessage(false);
      setStatusMessageBody("");
    }
  }, [workflowStatus, JSON.stringify(pipeline.workflow)]);


  const loadData = async (pipeline) => {
    // TODO: With the below check this is unnecessary-- leaving in for now but something to look at later
    if (pipeline?.workflow === undefined) {
      return;
    }

    if (pipeline?.workflow?.last_step === undefined) {
      setWorkflowStatus("stopped");
      return;
    }

    // TODO: This should probably be able to be replaced with pipeline?.workflow?.last_step?.status || false
    let status = pipeline?.workflow?.last_step?.hasOwnProperty("status") ? pipeline.workflow.last_step.status : false;

    //check for queued requests
    if (status === "running") {
      await checkPipelineQueueStatus();
    }

    if (status !== "running" && hasQueuedRequest) {
      delayRefresh();
    }

    if (status === "stopped" && pipeline?.workflow?.last_step?.running && pipeline?.workflow?.last_step?.running?.paused) {
      setWorkflowStatus("paused");

      //if step set currently running is an approval step, flag that
      if (pipeline?.workflow?.last_step?.running?.step_id) {
        const runningStep = pipelineHelpers.getStepIndexFromPlan(pipeline.workflow.plan, pipeline.workflow?.last_step?.running?.step_id);
        setIsApprovalGate(pipeline.workflow.plan[runningStep].tool?.tool_identifier === "approval");
      }

      return;
    }

    setWorkflowStatus(status);
  };

  const checkPipelineQueueStatus = async () => {
    const { orchestration } = await getFeatureFlags();
    setQueueingEnabled(orchestration?.enableQueuing);

    if (orchestration?.enableQueuing) {
      const queuedRequest = await pipelineActions.getQueuedPipelineRequestV2(getAccessToken, cancelTokenSource, pipeline?._id);
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
    await fetchActivityLogs();
    setResetPipeline(false);
    setStartPipeline(false);
    await checkPipelineQueueStatus();
  };

  const handleStopWorkflowClick = async (pipelineId) => {
    setResetPipeline(true);
    setWorkflowStatus("stopped");
    await stopPipelineRun(pipelineId);
    await fetchData();
    await fetchActivityLogs();
    setResetPipeline(false);
    setStartPipeline(false);
    await pipelineActions.deleteQueuedPipelineRequestV2(getAccessToken, cancelTokenSource, pipelineId);
    await checkPipelineQueueStatus();
  };

  const handleApprovalClick = () => {
    setShowApprovalModal(true);
  };

  const handleApprovalActivity = async (blnDelayRefresh, blnDelayedResume) => {
    setApproval(true);
    setInfoModal({
      show: true,
      header: "Approval Status",
      message: "Your response has been recorded in the Pipeline Activity Logs for the given step.  Pipeline operations will resume shortly.",
      button: "OK",
    });
    setWorkflowStatus("running");

    if (!blnDelayRefresh) {
      await fetchData();
    }

    if (blnDelayedResume) {
      delayResume(pipeline._id);
      return;
    }
    delayRefresh();
  };

  const handleRefreshClick = async () => {
    await fetchData();
    await fetchActivityLogs();
    await checkPipelineQueueStatus();
  };

  //action functions
  async function stopPipelineRun(pipelineId) {
    setStopPipeline(true);
    await PipelineActions.stop(pipelineId, getAccessToken)
      .catch(err => {
        console.log(err);
        toastContext.showLoadingErrorDialog(err);
      });
    setStopPipeline(false);
    setStartPipeline(false);
  }

  async function resetPipelineState(pipelineId) {
    setStopPipeline(true);
    await PipelineActions.reset(pipelineId, getAccessToken)
      .catch(err => {
        console.log(err);
        toastContext.showLoadingErrorDialog(err.error);
      });
    setStopPipeline(false);
    setStartPipeline(false);
  }

  async function runPipeline(pipelineId) {
    setStartPipeline(true);
    toastContext.showInformationToast("A request to start this pipeline has been submitted.  It will begin shortly.", 20);

    await PipelineActions.run(pipelineId, {}, getAccessToken)
      .catch(err => {
        setStartPipeline(false);
        console.error(err);
        toastContext.showLoadingErrorDialog(err.error);
      });

    setTimeout(async function() {
      await fetchData();
      setStartPipeline(false);
    }, delayCheckInterval);
  }

  /***
   * Used primiarily to call run API again to register a queued start request.  Unlike normal runPipeline, it doesn't impact
   * refresh patterns on the page
   * @param pipelineId
   * @returns {Promise<void>}
   */
  async function runPipelineLight(pipelineId) {
    toastContext.showInformationToast("A request to re-start this pipeline has been added to the queue.  Upon successful completion of this pipeline run, the pipeline will start again.", 20);

    await PipelineActions.run(pipelineId, {}, getAccessToken)
      .catch(err => {
        console.error(err);
        toastContext.showLoadingErrorDialog(err.error);
      });

    setHasQueuedRequest(true);
  }

  async function startNewPipelineRun(pipelineId) {
    setStartPipeline(true);
    toastContext.showInformationToast("A request to start this pipeline from the start has been submitted.  Resetting pipeline status and then the pipeline will begin momentarily.", 20);

    await PipelineActions.newStart(pipelineId, getAccessToken)
      .catch(err => {
        setStartPipeline(false);
        console.error(err);
        toastContext.showLoadingErrorDialog(err.error);
      });

    setTimeout(async function() {
      await fetchData();
      setStartPipeline(false);
    }, delayCheckInterval);
  }

  const handleResumeWorkflowClick = async (pipelineId) => {
    setStartPipeline(true);
    setWorkflowStatus("running");
    toastContext.showInformationToast("A request to resume this pipeline has been submitted.  It will begin shortly.", 20);

    await PipelineActions.resume(pipelineId, {}, getAccessToken)
      .catch(err => {
        setStartPipeline(false);
        console.log(err);
        toastContext.showLoadingErrorDialog(err.error);
      });

    setTimeout(async function() {
      await fetchData();
      setStartPipeline(false);
    }, delayCheckInterval);
  };

  const delayRefresh = () => {
    setTimeout(async function() {
      await fetchData();
    }, delayCheckInterval);
  };

  const delayResume = (pipelineId) => {
    setTimeout(async function() {
      await handleResumeWorkflowClick(pipelineId);
    }, 5000);
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
        refreshPipelineActivityData={fetchActivityLogs}
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

  const launchFreeTrialPipelineStartWizard = (pipelineId, pipelineOrientation, handleCloseFreeTrialDeploy) => {
    setFreetrialWizardModal({
      show: true,
      pipelineId: pipelineId,
      templateId: "",
      pipelineOrientation: pipelineOrientation,
    });
  };

  const handleCloseFreeTrialDeploy = () => {
    setFreetrialWizardModal({
      show: false,
      pipelineId: "",
      pipelineOrientation: "",
      handleCloseFreeTrialDeploy: "",
    });

    delayRefresh();
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
      />
    );
  };

  const handleRunPipelineClick = async (pipelineId) => {
    //check type of pipeline to determine if pre-flight wizard is required
    // is pipeline at the beginning or stopped midway or end of prior?
    const pipelineType = typeof pipeline.type !== "undefined" && pipeline.type[0] !== undefined ? pipeline.type[0] : ""; //for now type is just the first entry
    const pipelineTags = typeof pipeline.tags !== "undefined" && pipeline.tags !== undefined ? pipeline.tags : "";

    let pipelineOrientation = "start";
    //what step are we currently on in the pipeline: first, last or middle?
    if (pipeline.workflow.last_step && pipeline.workflow.last_step.step_id) {
      const stepIndex = PipelineHelpers.getStepIndex(pipeline, pipeline.workflow.last_step.step_id);
      console.log("current resting step index: ", stepIndex);
      if (stepIndex + 1 === Object.keys(pipeline.workflow.plan).length) {
        pipelineOrientation = "end";
      } else {
        pipelineOrientation = "middle";
      }
    }

    if (pipelineTags.some(el => el.value === "freetrial")) {
      launchFreeTrialPipelineStartWizard(pipelineId, "", handleCloseFreeTrialDeploy);
    } else if (pipelineType === "sfdc") {
      launchPipelineStartWizard(pipelineOrientation, pipelineType, pipelineId);
    }else if (pipelineType === "informatica") {
      launchInformaticaRunAssistant(pipelineOrientation, pipelineType, pipelineId);
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

  // TODO: Make base button components for these in the future
  return (
    <>
      <div className="d-flex flex-fill">

        {statusMessage &&
        <div className="warning-theme warning-text text-left">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: statusMessageBody })}>
            <FontAwesomeIcon icon={faInfoCircle} fixedWidth className="mr-1" style={{ cursor: "help" }} />
          </OverlayTrigger>
          {statusMessage}
        </div>
        }
        <div className="flex-fill p-2"></div>
        <div className="text-right btn-group btn-group-sized">
          {workflowStatus === "running" &&
          <>
            <Button variant="outline-dark"
                    className="btn-default"
                    size="sm"
                    disabled>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" /> Running</Button>
            <Button variant="danger"
                    className="btn-default"
                    size="sm"
                    onClick={() => {
                      handleStopWorkflowClick(pipeline._id);
                    }}
                    disabled={!authorizedAction("stop_pipeline_btn", pipeline.owner)}>
              {stopPipeline ?
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" /> :
                <FontAwesomeIcon icon={faStopCircle} className="mr-1" />}
              Stop
            </Button>
          </>}

          {workflowStatus === "paused" &&
          <>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "Approve the current state of the pipeline in order for it to proceed. Only Pipeline Admins and Managers (via Pipeline Access Rules) are permitted to perform this action." })}>
              <Button variant="warning"
                      className="btn-default"
                      size="sm"
                      onClick={() => {
                        handleApprovalClick();
                      }}
                      disabled={!authorizedAction("approve_step_btn", pipeline.owner)}>
                {approval ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth /> :
                  <FontAwesomeIcon icon={faFlag} className="mr-1" fixedWidth />}Approve</Button>
            </OverlayTrigger>
          </>}

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
                      disabled={!authorizedAction("start_pipeline_btn", pipeline.owner) || disabledActionState || startPipeline || hasQueuedRequest}>
                {startPipeline ? <><FontAwesomeIcon icon={faSpinner} fixedWidth spin className="mr-1" /> Starting</> :
                  <><FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1" /> Start Pipeline</>}
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
                  <FontAwesomeIcon icon={faRepeat1} fixedWidth /> Repeat Once</Button>
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
                    disabled={!authorizedAction("start_pipeline_btn", pipeline.owner) || disabledActionState || startPipeline}>
              {startPipeline ? <FontAwesomeIcon icon={faSpinner} fixedWidth spin className="mr-1" /> :
                <FontAwesomeIcon icon={faRedo} fixedWidth className="mr-1" />}
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
                      disabled={!authorizedAction("reset_pipeline_btn", pipeline.owner) || disabledActionState || startPipeline}>
                {resetPipeline ? <FontAwesomeIcon icon={faSpinner} fixedWidth spin className="mr-1" /> :
                  <FontAwesomeIcon icon={faRedo} fixedWidth className="mr-1" />}
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
                <FontAwesomeIcon icon={faClock} fixedWidth /> Queued Request</Button>
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
              <FontAwesomeIcon icon={faSync} fixedWidth /></Button>
          </OverlayTrigger>

        </div>
      </div>

      {showApprovalModal &&
      <ApprovalModal pipelineId={pipeline._id}
                     visible={showApprovalModal}
                     setVisible={setShowApprovalModal}
                     handleApprovalActivity={handleApprovalActivity} />}

      {infoModal.show &&
      <Modal header={infoModal.header}
             message={infoModal.message}
             button={infoModal.button}
             handleCancelModal={() => setInfoModal({ ...infoModal, show: false })} />}

      {freetrialWizardModal.show &&
      <FreeTrialPipelineWizard pipelineId={freetrialWizardModal.pipelineId}
                               templateId={freetrialWizardModal.templateId}
                               pipelineOrientation={freetrialWizardModal.pipelineOrientation}
                               autoRun={true}
                               handleClose={handleCloseFreeTrialDeploy} />}
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
  customerAccessRules: PropTypes.object,
  disabledActionState: PropTypes.bool,
  fetchData: PropTypes.func,
  fetchActivityLogs: PropTypes.func,
};
export default PipelineActionControls;
