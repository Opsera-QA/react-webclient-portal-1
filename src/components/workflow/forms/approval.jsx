import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../contexts/AuthContext";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  message: "",
  contact: ""
};

const INITIAL_THRESHOLD_VALUE = { 
  user: null,
  email: null,
  approved: false,
  approved_on: null  
};


function ApprovalStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault }) {
  const contextType = useContext(AuthContext);
  const [thresholdData, setThresholdData] = useState(INITIAL_THRESHOLD_VALUE);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (typeof(stepTool) !== "undefined") {
      let { configuration, threshold } = stepTool;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdData(threshold.value);        
      }
    } else {
      setFormData(INITIAL_DATA);
      setThresholdData(INITIAL_THRESHOLD_VALUE);
    }
  }, [stepTool]);


  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      if (thresholdData.approved) {
        const { getUserRecord } = contextType;
        const userInfoResponse = await getUserRecord();
        thresholdData.user = userInfoResponse._id;
        thresholdData.email = userInfoResponse.email;        
        thresholdData.approved_on = new Date();
      } else {
        thresholdData.user = null;
        thresholdData.email = null;        
        thresholdData.approved_on = null;
      }

      const item = {
        configuration: formData,
        threshold: {
          type: "user-approval",
          value: thresholdData
        }
      };
      parentCallback(item);
    }
  };


  const validateRequiredFields = () => {
    let { message, contact } = formData;
    if (message.length === 0 || contact.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };
  
  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

      <Form.Group controlId="repoField">
        <Form.Label>Notification Message*</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={formData.message || ""} onChange={e => setFormData({ ...formData, message: e.target.value })} />
      </Form.Group>
      <small className="form-text text-muted mb-3">Provide the step specific message to include in the approval notification.  Please ensure notification rules are enabled.</small>

      <Form.Group controlId="repoField">
        <Form.Label>Step Contact*</Form.Label>
        <Form.Control type="text" placeholder="" value={formData.contact || ""} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
      </Form.Group>
      <small className="form-text text-muted mb-3">Identify the name of the owner of this step in case the approver has questions</small>

      <div className="text-muted mb-3">
        Please note: For active notification, please use Slack.  Configure a Slack token in <Link to="/tools">API Tools</Link> and then 
        enable Slack notification for this step.
      </div>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      
      {/* <div className="my-4 pt-3">
        <Form.Label>Approval Threshold</Form.Label>
        <Form.Check 
          type="switch" disabled 
          id="approval-switch"
          label="Step Approved!" 
          checked={thresholdData.approved ? true : false}   
          onChange={() => setThresholdData({ ...thresholdData, approved: !thresholdData.approved })}    
        />
        <small className="form-text text-muted mt-2">This sets this step to approved until the next run.</small>
      </div> */}
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

ApprovalStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func
};

export default ApprovalStepConfiguration;