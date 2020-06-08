import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

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
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    console.log("fetch'n");
    fetchPipelineData(pipelineId);
  }, [visible]);


  const fetchPipelineData = async (pipelineId) => {
    setIsLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    setAccessToken(accessToken);
    const apiUrl =  `/pipelines/${pipelineId}`;
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl); 
      const pipelineData = pipeline && pipeline.data[0];
      
      console.log("pipelineData", pipelineData); 

      loadApprovalRequest(pipelineData);
      
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);      
    }
    setIsLoading(false);
  };


  const loadApprovalRequest = async (pipeline) => {
    //parse through pipeline and figure out which step is waiting for approval.  Look a thte last_step.running.paused and get it's stepID

    //register form valules:
    

    //IF a custom message is defined for the approval setp (tool.configuration) then load it in the setMessage, otherwise put a generic block of text in there
    setMessage(`A step in Pipeline ${pipeline.name} requires approval in order to proceed.  Please complete the form below in order to allow the pipeline to continue.`);      

  };




  const submitApproval = async (pipelineId, stepId, formData) => {
    setIsSaving(true);
    const apiUrl = `/pipelines/${pipelineId}/approve`;   
    const postBody = {
      "stepId": "STEP!",
      "message": formData.message
    };

    try {
      console.log("apiUrl", apiUrl);
      console.log("postBody", postBody);
      //const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      //console.log(res);   
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
    submitApproval(pipelineId, formData);    
  };


  return (
    <>
      <Modal show={visible} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Pipeline Step Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>          

          {errors ? <div className="error-text">Error Reported: {errors}</div> : null}

          <div className="mt-1 pb-3">{message}</div>  

          <Form>
            <Form.Group controlId="repoField">
              <Form.Label>Log Approval Message</Form.Label>
              <Form.Control as="textarea" type="text" placeholder="" value={formData.message || ""} onChange={e => setFormData({ ...formData, message: e.target.value })} />
            </Form.Group>
            <small className="form-text text-muted mt-2 text-left">Optional message to include in approval log</small>
          
            <div className="my-4 pt-1">
              <Form.Check 
                type="switch"
                id="approval-switch"
                label="Approved" 
                checked={formData.approved ? true : false}   
                onChange={() => setFormData({ ...setFormData, approved: !formData.approved })}    
              />
              <small className="form-text text-muted mt-2">Flip the Approved switch to approve this step</small>
            </div>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
          </Button>
          
          <Button variant="success" onClick={() => handleConfirm()} disabled={isLoading || !formData.approved || isSaving}>            
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


