import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";

const NOTIFICATION_OPTIONS = [
  { value: "finished", label: "Step Completed", message: "You will receive notifications on this step's completion no matter what the status." },
  { value: "error", label: "On Error", message: "You will receive notifications on any errors in this step." },
  { value: "all", label: "All Activity", message: "You will receive notifications for any activity on this step." }
];

const INITIAL_EMAIL = {
  type: "email",
  address: "",
  event: "error",
  enabled: false
};

const INITIAL_SLACK = {
  type: "slack",
  channel: "",
  event: "finished",
  enabled: false
};

const INITIAL_APPROVAL = {
  type: "approval",
  enabled: false
};

function StepNotificationConfiguration( { data, stepId, parentCallback }) {
  const { plan } = data.workflow;
  const [stepName, setStepName] = useState();
  const [stepTool, setStepTool] = useState({});
  const [formDataEmail, setFormDataEmail] = useState(INITIAL_EMAIL);
  const [formDataSlack, setFormDataSlack] = useState(INITIAL_SLACK);
  const [formDataApproval, setFormDataApproval] = useState(INITIAL_APPROVAL);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);


  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        const stepIndex = getStepIndex(stepId);
        await loadFormData(plan[stepIndex]);        
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);     
      controller.abort();      
    };
  }, [stepId]);


  const loadFormData = async (step) => {
    setFormDataEmail(INITIAL_EMAIL);      
    setFormDataSlack(INITIAL_SLACK);
    setFormDataApproval(INITIAL_APPROVAL);   
    
    if (step.notification !== undefined) {
      let emailArrayIndex = step.notification.findIndex(x => x.type === "email");
      let slackArrayIndex = step.notification.findIndex(x => x.type === "slack");
      let approvalArrayIndex = step.notification.findIndex(x => x.type === "approval");
      if (emailArrayIndex >= 0) {
        setFormDataEmail(step.notification[emailArrayIndex]);
      } 
      if (slackArrayIndex >= 0) {
        setFormDataSlack(step.notification[slackArrayIndex]);
      }  
      if (approvalArrayIndex >= 0) {
        setFormDataApproval(step.notification[approvalArrayIndex]);
      }    
    } 
    setStepTool(step.tool);
    setStepName(step.name);      
  };



  const callbackFunction = () => {   
    if (validateRequiredFields()) {      
      let stepArrayIndex = getStepIndex(stepId); 
      plan[stepArrayIndex].notification = [formDataEmail, formDataSlack, formDataApproval];
      parentCallback(plan);      
    }
  };

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex(x => x._id === step_id); 
    console.log(plan[stepArrayIndex]);
    return stepArrayIndex;
  };

  const validateRequiredFields = () => {    
    setFormMessage("");
    if (formDataEmail.enabled) {
      if (formDataEmail.address.length === 0 || !emailIsValid(formDataEmail.address)) {
        setFormMessage("Warning: Email address missing or invalid!");
        return false;
      }
    }
    
    if (formDataSlack.enabled) {
      if (formDataSlack.channel.charAt(0) === "#") {
        setFormMessage("Error: Please remove the pound symbol '#' from the Slack channel name.");
        return false;
      }
      if (formDataSlack.channel.length === 0) {
        setFormMessage("Warning: Slack channel value missing!");
        return false;
      }
    }

    if (formDataApproval.enabled) {
      if (!formDataEmail.enabled && !formDataSlack.enabled){
        setFormMessage("Error: Cannot enable approval requirement for this step without Slack or email notification enabled!");
        return false;
      }
    }
    return true;
  };

  const handleEmailServiceChange = (selectedOption) => {
    setFormDataEmail({ ...formDataEmail, event: selectedOption.value });    
  };

  const handleSlackServiceChange = (selectedOption) => {
    setFormDataSlack({ ...formDataSlack, event: selectedOption.value });    
  };

   
  return (
    <Form>
      <h6 className="upper-case-first">{typeof(stepName) !== "undefined" ? stepName + ": " : null}
        {typeof(stepTool) !== "undefined" ? stepTool.tool_identifier : null}</h6>
      <div className="text-muted mt-1 mb-3">Each step in the workflow can be configured with notification triggers upon completion. More help on notification configurations is available <Link to="/tools">here</Link>.</div>

      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
      <div className="mt-4 mb-4">
        <Form.Check 
          type="switch"
          id="slack-switch"
          label="Slack Notifications" 
          checked={formDataSlack.enabled ? true : false}   
          onChange={() => setFormDataSlack({ ...formDataSlack, enabled: !formDataSlack.enabled })} 
        />
        <Form.Group controlId="repoField">
          <Form.Label>Slack Channel</Form.Label>
          <Form.Control maxLength="50" type="text" disabled={!formDataSlack.enabled} placeholder="" value={formDataSlack.channel || ""} onChange={e => setFormDataSlack({ ...formDataSlack, channel: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Notification Level</Form.Label>
          {renderForm ?
            <DropdownList
              data={NOTIFICATION_OPTIONS} 
              disabled={!formDataSlack.enabled} 
              valueField='id'
              textField='label'
              defaultValue={NOTIFICATION_OPTIONS[NOTIFICATION_OPTIONS.findIndex(x => x.value === formDataSlack.event)]}
              onChange={handleSlackServiceChange}             
            /> : null }
        </Form.Group>
      </div> 
      
      <div className="my-4 pt-3">
        <Form.Check 
          type="switch" disabled
          id="email-switch"
          label="Email Notifications" 
          checked={formDataEmail.enabled ? true : false}   
          onChange={() => setFormDataEmail({ ...formDataEmail, enabled: !formDataEmail.enabled })}    
        />
        <Form.Group controlId="branchField">
          <Form.Label>Email Address</Form.Label>
          <Form.Control maxLength="100" type="text" disabled={!formDataEmail.enabled} placeholder="" value={formDataEmail.address || ""} onChange={e => setFormDataEmail({ ...formDataEmail, address: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Notification Level</Form.Label>
          {renderForm ?
            <DropdownList
              data={NOTIFICATION_OPTIONS}
              valueField='id'
              disabled={!formDataEmail.enabled} 
              textField='label'
              defaultValue={NOTIFICATION_OPTIONS[NOTIFICATION_OPTIONS.findIndex(x => x.value === formDataEmail.event)]}
              onChange={handleEmailServiceChange}             
            /> : null }
        </Form.Group> 
      </div>

      {/* <div className="my-4 pt-3">
        <Form.Check 
          type="switch" disabled
          id="approval-switch"
          label="Require Approval" 
          checked={formDataApproval.enabled ? true : false}   
          onChange={() => setFormDataApproval({ ...formDataApproval, enabled: !formDataApproval.enabled })}    
        />
        <small className="form-text text-muted mt-2">If this feature is enabled, the notifier listed above will need to approve the completion of this step before the pipeline can proceed.  WARNING: This will halt the pipeline workflow until a user responds.</small>
      </div> */}

      <Button variant="primary" type="button"  
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      {/* <small className="form-text text-muted mt-2 text-right">* Required Fields</small> */}
    </Form>
  );
}


const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


StepNotificationConfiguration.propTypes = {
  data: PropTypes.object,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func
};

export default StepNotificationConfiguration;