import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

//TODO This must match .notification Array, for now just assume a single entry
const INITIAL_DATA = {
  type: "",
  address: "",
  event: ""
};


function StepNotificationConfiguration( { data, editItem, parentCallback }) {
  let { plan } = data.workflow;
  const [stepName, setStepName] = useState();
  const [stepTool, setStepTool] = useState({});
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    let stepIndex = getStepIndex(editItem.step_id);
    if (plan[stepIndex].notification[0] !== undefined) {
      setFormData(plan[stepIndex].notification[0]);
    } else {
      setFormData(INITIAL_DATA);
    }
    setStepTool(plan[stepIndex].tool);
    setStepName(plan[stepIndex].name);
  }, [editItem, data]);


  const callbackFunction = () => {   
    if (validateRequiredFields()) {
      let { type, address, event } = formData;
      const item = {
        type: type,
        address: address, 
        event: event
      };
      console.log("Need to build this data model", item);
      let stepArrayIndex = getStepIndex(editItem.step_id); 
      plan[stepArrayIndex].notification[0] = item;
      //parentCallback(plan);
      setFormData(INITIAL_DATA);      
    }
  };

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex(x => x._id === step_id); 
    console.log(plan[stepArrayIndex]);
    return stepArrayIndex;
  };

  const validateRequiredFields = () => {
    console.log("formData ", formData);
    let { type, address } = formData;
    if (type.length === 0 || address.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };
  
  return (
    <Form>
      <h6 className="upper-case-first">{typeof(stepName) !== "undefined" ? stepName + ": " : null}
        {typeof(stepTool) !== "undefined" ? stepTool.tool_identifier : null}</h6>
      <div className="text-muted mt-1 mb-3">Each step in the workflow can be configured with notification triggers upon completion. More help on notification configurations is available <Link to="/tools">here</Link>.</div>

      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
      
      <Form.Group controlId="repoField">
        <Form.Label>Notification Type (email/slack)</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.type || ""} onChange={e => setFormData({ ...formData, type: e.target.value })} />
      </Form.Group>
      
      <Form.Group controlId="branchField">
        <Form.Label>Email Address</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.address || ""} onChange={e => setFormData({ ...formData, address: e.target.value })} />
      </Form.Group>
      

      
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