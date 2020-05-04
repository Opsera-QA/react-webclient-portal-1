import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";


const NOTIFICATION_OPTIONS = [
  { value: "finished", label: "Completed", message: "You will receive notifications on this step's completion no matter what the status." },
  { value: "error", label: "Error", message: "You will receive notifications on any errors in this step." },
  { value: "all", label: "Watch", message: "You will receive notifications for any activity on this step." }
];

const INITIAL_EMAIL = {
  type: "email",
  address: "",
  event: "error"
};

const INITIAL_SLACK = {
  type: "slack",
  channel: "",
  event: "finished"
};


function StepNotificationConfiguration( { data, editItem, parentCallback }) {
  let { plan } = data.workflow;
  const [stepName, setStepName] = useState();
  const [stepTool, setStepTool] = useState({});
  const [formDataEmail, setFormDataEmail] = useState(INITIAL_EMAIL);
  const [formDataSlack, setFormDataSlack] = useState(INITIAL_SLACK);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    let stepIndex = getStepIndex(editItem.step_id);
    if (plan[stepIndex].notification[0] !== undefined) {

      let emailArrayIndex = plan[stepIndex].notification.findIndex(x => x.type === "email");
      let slackArrayIndex = plan[stepIndex].notification.findIndex(x => x.type === "slack");

      setFormDataEmail(plan[stepIndex].notification[emailArrayIndex]);
      setFormDataSlack(plan[stepIndex].notification[slackArrayIndex]);
    } else {
      setFormDataEmail(INITIAL_EMAIL);      
      setFormDataSlack(INITIAL_SLACK);
    }
    setStepTool(plan[stepIndex].tool);
    setStepName(plan[stepIndex].name);
  }, [editItem, data]);


  const callbackFunction = () => {   
    if (validateRequiredFields()) {      
      let stepArrayIndex = getStepIndex(editItem.step_id); 
      plan[stepArrayIndex].notification = [formDataEmail, formDataSlack];
      
      console.log("Does this work???", plan[stepArrayIndex].notification);
      
      //parentCallback(plan);
      setFormDataEmail(INITIAL_EMAIL);      
      setFormDataSlack(INITIAL_SLACK);
    }
  };

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex(x => x._id === step_id); 
    console.log(plan[stepArrayIndex]);
    return stepArrayIndex;
  };

  const validateRequiredFields = () => {
    return true;
    /* console.log("formData ", formData);
    let { type, address } = formData;
    if (type.length === 0 || address.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    } */
  };

  const handleEmailServiceChange = (selectedOption) => {
    setFormDataEmail({ ...formDataEmail, event: selectedOption.value });    
  };

  const handleSlackServiceChange = (selectedOption, type) => {
    setFormDataSlack({ ...formDataSlack, event: selectedOption.value });    
  };
  

  //TODO: Need to wire up switches to disable respective forms
  //TODO: If user saves with switch turned off, clear out saved data (do it in callbackFunction)
  //TODO: Restore validation function logic based on switch settings.  For now, just make sure if email is enabled, there is an address, add address validation



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
        />
        <Form.Group controlId="repoField">
          <Form.Label>Slack Channel</Form.Label>
          <Form.Control maxLength="50" type="text" placeholder="" value={formDataSlack.channel || ""} onChange={e => setFormDataSlack({ ...formDataSlack, channel: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Notification Level</Form.Label>
          {formDataSlack.event !== undefined ?
            <DropdownList
              data={NOTIFICATION_OPTIONS}
              valueField='id'
              textField='label'
              defaultValue={formDataSlack.event ? NOTIFICATION_OPTIONS[NOTIFICATION_OPTIONS.findIndex(x => x.value === formDataSlack.event)] : NOTIFICATION_OPTIONS[0]}
              onChange={handleSlackServiceChange}             
            /> : null }
        </Form.Group>
      </div> 
      
      <div className="my-4 pt-3">
        <Form.Check 
          type="switch"
          id="email-switch"
          label="Email Notifications"        
        />
        <Form.Group controlId="branchField">
          <Form.Label>Email Address</Form.Label>
          <Form.Control maxLength="100" type="text" placeholder="" value={formDataEmail.address || ""} onChange={e => setFormDataEmail({ ...formDataEmail, address: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Notification Level</Form.Label>
          {formDataEmail.event !== undefined ?
            <DropdownList
              data={NOTIFICATION_OPTIONS}
              valueField='id'
              textField='label'
              defaultValue={formDataEmail.event ? NOTIFICATION_OPTIONS[NOTIFICATION_OPTIONS.findIndex(x => x.value === formDataEmail.event)] : NOTIFICATION_OPTIONS[0]}
              onChange={handleEmailServiceChange}             
            /> : null }
        </Form.Group>
      </div>
      <Button variant="primary" type="button" disabled 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

StepNotificationConfiguration.propTypes = {
  data: PropTypes.object,
  editItem: PropTypes.object,
  parentCallback: PropTypes.func
};

export default StepNotificationConfiguration;