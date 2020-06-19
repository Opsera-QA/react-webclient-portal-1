import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import PipelineHelpers from "./pipelineHelpers";

const INITIAL_FORM = {
  message: "",
  approved: false
};

function StepApprovalModal({ pipelineId, visible, setVisible, refreshActivity }) {
  const contextType = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [accessToken, setAccessToken] = useState("");
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
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    setAccessToken(accessToken);
    const apiUrl =  `/pipelines/${pipelineId}`;
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl); 
      const pipelineData = pipeline && pipeline.data[0];      
      //console.log("pipelineData", pipelineData); 
      loadApprovalRequest(pipelineData);      
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);      
    }
    setIsLoading(false);
  };

  const loadApprovalRequest = async (pipeline) => {
    const step = PipelineHelpers.getPendingApprovalStep(pipeline);
    const priorStep = PipelineHelpers.getPriorStepFrom(pipeline, step);
    if (step) {
      setApprovalStep(step);
      setPriorToApprovalStep(priorStep);
      console.log(priorStep);
      let customStepMessage = "";
      if (step.tool.configuration.message.length > 0) {
        customStepMessage += step.tool.configuration.message + " Approval Contact: " + step.tool.configuration.contact;
      }
      setMessage(customStepMessage); 
    }      
  };

  const submitApproval = async (pipelineId, stepId, formData) => {
    setIsSaving(true);
    const apiUrl = `/pipelines/${pipelineId}/approve`;   
    const postBody = {
      "stepId": stepId,
      "message": formData.message
    };

    try {
      console.log("apiUrl", apiUrl);
      console.log("postBody", postBody);
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      console.log(res);   
      refreshActivity();   
      setVisible(false);
    }
    catch (err) {
      console.log(err.message);      
      setErrors(err.message);
    }
    setIsSaving(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = async () => {
    if (approvalStep) {
      submitApproval(pipelineId, approvalStep._id, formData);    
    }    
  };


  return (
    <>
      <Modal show={visible} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Pipeline Step Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>          

          {errors ? <div className="error-text">Error Reported: {errors}</div> : null}

          {Object.keys(approvalStep) === 0 ? <div className="info-text">No steps in this pipeline require approval at this time.</div> : 
            <>
              <div className="my-2">Approval Required After Step: {priorToApprovalStep.name}</div> 
              <div><small className="pl-2"><FontAwesomeIcon icon={faIdBadge} size="sm" fixedWidth className="mr-1"/>  
                      ID: {priorToApprovalStep._id}</small></div>   
              
              { message && <div className="my-3">Step Approval Message:<br/><span className="text-muted">{message}</span></div>}            

              <div className="my-3">Please review the status of this pipeline and then log approval here in order for it to proceed to the next step.</div>   
              <Form>
                <Form.Group controlId="repoField">
                  <Form.Label>Notes:</Form.Label>
                  <Form.Control as="textarea" type="text" placeholder="" value={formData.message || ""} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                </Form.Group>
                <small className="form-text text-muted mt-2 text-left">Optional message to include in approval log</small>
          
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
            </> 
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
          </Button>
          
          <Button variant="success" onClick={() => handleConfirm()} disabled={isLoading || !formData.approved || isSaving || !approvalStep}>            
            {isSaving ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : <FontAwesomeIcon icon={faCheck} fixedWidth />  }
             Approve Step
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
  refreshActivity: PropTypes.func
};

export default StepApprovalModal;


