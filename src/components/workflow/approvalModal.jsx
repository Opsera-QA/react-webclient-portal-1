import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, Modal, Form, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { faArrowRight, faCheck, faIdBadge, faSpinner, faTimes, faToolbox, faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import PipelineHelpers from "./pipelineHelpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import PipelineActions from "./pipeline-actions";
import CommonModal from "components/common/modal/modal";
import LoadingDialog from "../common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";
import axios from "axios";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

const INITIAL_FORM = {
  message: "",
  approved: false,
  denied: false,
};

function StepApprovalModal({ pipelineId, visible, setVisible, handleApprovalActivity }) {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = contextType;
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingDeny, setIsSavingDeny] = useState(false);
  const [message, setMessage] = useState("");
  const [childPipelinemessage, setChildPipelineMessage] = useState("");
  const [approvalStep, setApprovalStep] = useState({});
  const [approvalPipeline, setApprovalPipeline] = useState({});
  const [priorToApprovalStep, setPriorToApprovalStep] = useState({});
  const [nextToApprovalStep, setNextToApprovalStep] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isChildProcess, setIsChildProcess] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setApprovalStep({});
    setApprovalPipeline({});
    setFormData(INITIAL_FORM);
    setChildPipelineMessage("");
    setIsChildProcess(false);

    loadFormData(source)
      .then(res => {
          setIsLoading(false);
        },
      )
      .catch(err => {
        toastContext.showLoadingErrorDialog(err);
        setIsLoading(false);
      });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineId]);

  const loadFormData = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    const pipelineData = await PipelineActions.getPipelineByIdV2(
      getAccessToken,
      cancelSource,
      pipelineId,
      )
      .catch(err => {
        toastContext.showLoadingErrorDialog(err);
      });
    const pipeline = pipelineData?.data?.data;

    if (!pipelineData) {
      return;
    }

    let approvalStep = PipelineHelpers.getPendingApprovalStep(pipeline);

    if (approvalStep) {
      setApprovalState(pipeline, approvalStep);
      return;
    }

    if (!approvalStep) {
      //see if there's a step in a child pipeline
      const {childPipeline, childApprovalStep} = await checkChildPipelines(pipeline);
      setApprovalState(childPipeline, childApprovalStep);
      setIsChildProcess(true);
      return;
    }

    setApprovalPipeline(false);
    setApprovalStep(false);
  };


  const setApprovalState = (pipeline, approvalStep) => {
    if (!pipeline || !approvalStep) {
      setApprovalPipeline(false);
      setApprovalStep(false);
      return;
    }
    const priorStep = PipelineHelpers.getPriorStepFrom(pipeline, approvalStep);
    const nextStep = PipelineHelpers.getNextStepFrom(pipeline, approvalStep);
    setApprovalPipeline(pipeline);
    setApprovalStep(approvalStep);
    setPriorToApprovalStep(priorStep);
    setNextToApprovalStep(nextStep);
    buildMessage(approvalStep);
  };


  const checkChildPipelines = async (parentPipeline) => {
    const childPipelines = PipelineHelpers.getChildPipelinesFromParent(parentPipeline);
    const childPipelineStatesData = await PipelineActions.getPipelineStates(childPipelines, getAccessToken)
      .catch(err => {
        toastContext.showLoadingErrorDialog(err);
        setIsLoading(false);
      });
    const childPipelineStates = childPipelineStatesData && childPipelineStatesData.data;

    if (!childPipelineStates) {
      return false;
    }

    let pausedPipelines = childPipelineStates.filter(function(e) {
      return e.state === "paused";
    });

    if (!Array.isArray(pausedPipelines) || pausedPipelines.length === 0) {
      return false;
    }

    const pausedPipelineId = pausedPipelines[0]?.pipelineId;

    if (isMongoDbId(pausedPipelineId) !== true) {
      return;
    }

    //lookup child pipeline and return that and approval to caller
    const pausedChildPipelineData = await PipelineActions.getPipelineByIdV2(
      getAccessToken,
      cancelTokenSource,
      pausedPipelineId,
    )
      .catch(err => {
        toastContext.showLoadingErrorDialog(err);
      });
    const childPipeline = pausedChildPipelineData?.data?.data;

    if (!childPipeline) {
      return false;
    }

    let childApprovalStep = PipelineHelpers.getPendingApprovalStep(childPipeline);

    if (!childApprovalStep) {
      return false;
    }

    setChildPipelineMessage(`Child Pipeline Approval Required: ${childPipeline.name}`);
    return {childPipeline, childApprovalStep};
  };


  const buildMessage = (step) => {
    let customStepMessage = "";
    if (step.tool?.configuration?.message) {
      customStepMessage += step.tool.configuration.message + " Approval Contact: " + step.tool.configuration.contact;
    }
    setMessage(customStepMessage);
  };


  const submitApproval = async (pipelineId, stepId, formData) => {
    setIsSaving(true);
    const postBody = {
      "stepId": stepId,
      "message": formData.message,
    };

    await PipelineActions.approve(pipelineId, postBody, getAccessToken)
      .catch(err => {
        toastContext.showLoadingErrorDialog(err);
        return;
      });

    handleApprovalActivity(isChildProcess, isChildProcess);
    setIsSaving(false);
    setVisible(false);
  };

  const submitDenial = async (pipelineId, stepId, formData) => {
    setIsSavingDeny(true);
    const postBody = {
      "stepId": stepId,
      "message": formData.message,
    };

    await PipelineActions.deny(pipelineId, postBody, getAccessToken)
      .catch(err => {
        toastContext.showLoadingErrorDialog(err);
      });

    handleApprovalActivity(isChildProcess, isChildProcess);
    setIsSavingDeny(false);
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };


  const handleConfirm = async (type) => {
    if (approvalStep && approvalPipeline) {
      if (type === "approve") {
        await submitApproval(approvalPipeline._id, approvalStep._id, formData);
      }
      if (type === "deny") {
        await submitDenial(approvalPipeline._id, approvalStep._id, formData);
      }
      return;
    }

    toastContext.showLoadingErrorDialog("An error has occurred attempting to process confirmation request.");
  };


  if (!approvalStep) {
    return (<CommonModal header="Approval Step Not Found"
                         message="No approval step has been found for this pipeline."
                         button="OK"
                         handleCancelModal={() => handleClose()}/>);
  }


  return (
    <>
      <Modal size="lg" show={visible} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Pipeline Approval Gate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3">

            <div>
              Approval of this interaction is required in order for the pipeline to proceed. Please review the
              details below as well as the Pipeline Activity Logs and confirm that this pipeline can complete its
              operations.  Only Pipeline Admins and Managers (via Pipeline Access Rules) are permitted to perform this
              action.
            </div>

            {isLoading && <LoadingDialog/>}

            {childPipelinemessage && <div className="title-text-6 mt-3">{childPipelinemessage}</div>}

            <div className="d-flex m-3 justify-content-center">
              <div className="p-1">
                {priorToApprovalStep &&
                <RenderWorkflowItem item={priorToApprovalStep}/>
                }
              </div>
              <div className="p-1 my-auto">
                {priorToApprovalStep &&
                  <IconBase
                    icon={faArrowRight}
                    iconSize={"2x"}
                    className={"p-1"}
                  />
                }
              </div>
              <div className="p-1">
                {approvalStep &&
                <RenderWorkflowItem item={approvalStep} stateColorClass={"workflow-step-warning"}/>
                }
              </div>
              <div className="p-1 my-auto">
                {nextToApprovalStep &&
                  <IconBase
                    icon={faArrowRight}
                    iconSize={"2x"}
                    className={"p-1"}
                  />
                }
              </div>
              <div className="p-1">
                {nextToApprovalStep &&
                <RenderWorkflowItem item={nextToApprovalStep}/>
                }
              </div>
            </div>


            {message &&
            <div className="m-3 p-3 text-muted italic" style={{ backgroundColor: "#f2f4f8" }}>{message}</div>}


            <Form>
              <Form.Group controlId="repoField">
                <Form.Label>Approval Comments:</Form.Label>
                <Form.Control as="textarea" type="text" placeholder="" value={formData.message || ""}
                              onChange={e => setFormData({ ...formData, message: e.target.value })}/>
              </Form.Group>
              <small className="form-text text-muted text-left">Optional message to include in approval
                log which will be visible in the Activity logs for this pipeline</small>

              <div className="my-4 pt-1 text-right">
                <Form.Check
                  type="switch"
                  id="approval-switch"
                  label="Approved"
                  checked={formData.approved ? true : false}
                  onChange={() => setFormData({ ...formData, approved: !formData.approved })}
                />
                <small className="form-text text-muted">Flip the switch to approve this step</small>
              </div>
            </Form>


          </div>
        </Modal.Body>
        <Modal.Footer>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Approve this pipeline using the switch above in order for it to proceed." })}>
            <Button variant="success" onClick={() => handleConfirm("approve")}
                    disabled={isLoading || !formData.approved || isSaving || !approvalStep}>
                <IconBase isLoading={isSaving} icon={faCheck} className={"mr-1"} fixedWidth/>
              Approve
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Stop this pipeline from proceeding further" })}>
            <Button variant="danger" onClick={() => handleConfirm("deny")}
                    disabled={isLoading || formData.approved || isSavingDeny || !approvalStep}>
              <IconBase isLoading={isSavingDeny} icon={faTimes} className={"mr-1"} fixedWidth/>
              Deny
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Close this window leaving the pipeline in a paused state" })}>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
          </OverlayTrigger>

        </Modal.Footer>
      </Modal>
    </>
  );
}


export function RenderWorkflowItem({ item, stateColorClass, isSelected }) {
  return (
    <>
      <div className={"p-1 workflow-module-container workflow-module-container-width mx-auto " + (isSelected ? "workflow-step-running" : stateColorClass) }>
        <div className="workflow-module-container-height flex-row" style={{ width: "275px" }}>
          <Row>
            <Col sm={9}>
               <div className="text-muted mr-1">{item.name}</div>
            </Col>
             <Col sm={1}>
              <span className="flex-grow-1 text-right">
                {isSelected &&
                      <IconBase icon={faCheckCircle} className={"mr-2 green"}/>
                }
              </span>
            </Col>
          </Row>

         
          <div className="p-1 text-muted small">
            <IconBase
              icon={faToolbox}
              iconSize={"sm"}
              className={"mr-1"}
            />
            Tool: {item.tool?.tool_identifier || ""}
          </div>
          <div className="p-1 text-muted small">
            <IconBase
              icon={faIdBadge}
              iconSize={"sm"}
              className={"mr-1"}
            />
            ID: {item._id}</div>
        </div>
      </div>
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

RenderWorkflowItem.propTypes = {
  item: PropTypes.object,
  stateColorClass: PropTypes.string,
  isSelected: PropTypes.bool,
};

StepApprovalModal.propTypes = {
  pipelineId: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  handleApprovalActivity: PropTypes.func,
};

export default StepApprovalModal;


