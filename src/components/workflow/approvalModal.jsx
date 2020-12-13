import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faIdBadge, faSpinner, faTimes, faToolbox } from "@fortawesome/pro-light-svg-icons";
import PipelineHelpers from "./pipelineHelpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import PipelineActions from "./pipeline-actions";
import CommonModal from "components/common/modal/modal";
import LoadingDialog from "../common/status_notifications/loading";

const INITIAL_FORM = {
  message: "",
  approved: false,
  denied: false,
};

function StepApprovalModal({ pipelineId, visible, setVisible, refreshActivity }) {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = contextType;
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingDeny, setIsSavingDeny] = useState(false);
  const [message, setMessage] = useState("");
  const [approvalStep, setApprovalStep] = useState({});
  const [priorToApprovalStep, setPriorToApprovalStep] = useState({});
  const [nextToApprovalStep, setNextToApprovalStep] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setApprovalStep({});
    setFormData(INITIAL_FORM);
    fetchPipelineData(pipelineId);
  }, []);


  const fetchPipelineData = async (pipelineId) => {
    setIsLoading(true);
    const pipeline = await PipelineActions.get(pipelineId, getAccessToken)
      .catch(err => {
        toastContext.showLoadingErrorDialog(err);
      });

    const pipelineData = pipeline && pipeline.data[0];
    await loadApprovalRequest(pipelineData);

    setIsLoading(false);
  };

  const loadApprovalRequest = async (pipeline) => {
    const step = PipelineHelpers.getPendingApprovalStep(pipeline);
    const priorStep = PipelineHelpers.getPriorStepFrom(pipeline, step);
    const nextStep = PipelineHelpers.getNextStepFrom(pipeline, step);

    if (step) {
      setApprovalStep(step);
      setPriorToApprovalStep(priorStep);
      setNextToApprovalStep(nextStep);

      let customStepMessage = "";
      if (step.tool?.configuration?.message) {
        customStepMessage += step.tool.configuration.message + " Approval Contact: " + step.tool.configuration.contact;
      }

      setMessage(customStepMessage);
    }
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

    refreshActivity();
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

    refreshActivity();
    setIsSavingDeny(false);
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = async (type) => {
    if (approvalStep) {
      if (type === "approve") {
        await submitApproval(pipelineId, approvalStep._id, formData);
      }
      if (type === "deny") {
        await submitDenial(pipelineId, approvalStep._id, formData);
      }
    }
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
              details below as well as the Pipline Activity Logs and confirm that this pipeline can complete its
              operations.
            </div>

            {isLoading && <LoadingDialog/>}


            <div className="d-flex m-3 justify-content-center">
              <div className="p-1">
                {priorToApprovalStep &&
                <RenderWorkflowItem item={priorToApprovalStep}/>
                }
              </div>
              <div className="p-1 my-auto">
                {priorToApprovalStep &&
                <FontAwesomeIcon icon={faArrowRight} size="2x" fixedWidth
                                 className="p-1"/>}
              </div>
              <div className="p-1">
                {approvalStep &&
                <RenderWorkflowItem item={approvalStep} stateColorClass={"workflow-step-warning"}/>
                }
              </div>
              <div className="p-1 my-auto">
                {nextToApprovalStep &&
                <FontAwesomeIcon icon={faArrowRight} size="2x" fixedWidth
                                 className="p-1"/>}
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
              {isSaving ?
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> :
                <FontAwesomeIcon icon={faCheck} fixedWidth/>}
              Approve
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "Stop this pipeline from proceeding further" })}>
            <Button variant="danger" onClick={() => handleConfirm("deny")}
                    disabled={isLoading || formData.approved || isSavingDeny || !approvalStep}>
              {isSavingDeny ?
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> :
                <FontAwesomeIcon icon={faTimes} fixedWidth/>}
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


function RenderWorkflowItem({ item, stateColorClass }) {
  console.log(item)
  return (
    <>
      <div className={"p-1 workflow-module-container workflow-module-container-width mx-auto " + stateColorClass}>
        <div className="workflow-module-container-height" style={{ width: "275px" }}>
          <div className="text-muted mr-1">{item.name}</div>
          <div className="p-1 text-muted small">
            <FontAwesomeIcon icon={faToolbox} size="sm" fixedWidth
                             className="mr-1"/> Tool: {item.tool?.tool_identifier || ""}
          </div>
          <div className="p-1 text-muted small">
            <FontAwesomeIcon icon={faIdBadge} size="sm" fixedWidth
                             className="mr-1"/>ID: {item._id}</div>
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
  stateColorClass: PropTypes.string
};

StepApprovalModal.propTypes = {
  pipelineId: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  refreshActivity: PropTypes.func,
};

export default StepApprovalModal;


