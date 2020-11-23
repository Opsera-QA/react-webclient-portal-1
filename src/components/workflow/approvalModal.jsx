import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTimes } from "@fortawesome/pro-light-svg-icons";
import PipelineHelpers from "./pipelineHelpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import PipelineActions from "./pipeline-actions";
import CommonModal from "components/common/modal/modal";

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

    if (step) {
      setApprovalStep(step);
      setPriorToApprovalStep(priorStep);

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
      <Modal show={visible} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Pipeline Runtime Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3">

            {!priorToApprovalStep ?
              <><div className="h6">Pipeline Approval Required Prior to Running</div></> :
              <><div className="h6">Approval Required To Proceed Past: {priorToApprovalStep.name}</div></>
            }

            {message &&
            <div className="my-3 text-muted italic">{message}</div>}

            <div className="my-3">Please review the status of this pipeline and then log approval here in order for
              it to proceed. Denying approval will stop the pipeline at this point and mark it as failed.
            </div>
            <Form>
              <Form.Group controlId="repoField">
                <Form.Label>Notes:</Form.Label>
                <Form.Control as="textarea" type="text" placeholder="" value={formData.message || ""}
                              onChange={e => setFormData({ ...formData, message: e.target.value })}/>
              </Form.Group>
              <small className="form-text text-muted mt-2 text-left">Optional message to include in approval
                log which will be visible in the Activity logs for this pipeline</small>

              <div className="my-4 pt-1">
                <Form.Check
                  type="switch"
                  id="approval-switch"
                  label="Approved"
                  checked={formData.approved ? true : false}
                  onChange={() => setFormData({ ...formData, approved: !formData.approved })}
                />
                <small className="form-text text-muted mt-2">Flip the Approved switch to approve this step</small>
              </div>
            </Form>


          </div>
        </Modal.Body>
        <Modal.Footer>


          <Button variant="success" onClick={() => handleConfirm("approve")}
                  disabled={isLoading || !formData.approved || isSaving || !approvalStep}>
            {isSaving ?
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> :
              <FontAwesomeIcon icon={faCheck} fixedWidth/>}
            Approve / Continue Pipeline
          </Button>

          <Button variant="danger" onClick={() => handleConfirm("deny")}
                  disabled={isLoading || formData.approved || isSavingDeny || !approvalStep}>
            {isSavingDeny ?
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> :
              <FontAwesomeIcon icon={faTimes} fixedWidth/>}
            Deny / Stop Pipeline
          </Button>

          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}


StepApprovalModal.propTypes = {
  pipelineId: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  refreshActivity: PropTypes.func,
};

export default StepApprovalModal;


