//PP-97 Deploy Step form for AWS Elastic Beanstalk

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  userId: "",
  sshkey: "",
  serverip: "",
  serverpath: "",
  artifacts: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SshUploadDeploy( { data, parentCallback }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      let { configuration, threshold } = data;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [data]);


  const callbackFunction = () => {
    if (validateRequiredFields()) {
      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal
        }
      };
      parentCallback(item);
    }
  };


  const validateRequiredFields = () => {
    let { userId, sshkey, serverip, serverpath, artifacts } = formData;
    if (userId.length === 0 || sshkey.length === 0 || serverip.length === 0 || serverpath.length === 0 || artifacts.length === 0) {
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

      <Form.Group controlId="branchField">
        <Form.Label>User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.userId || ""} onChange={e => setFormData({ ...formData, userId: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>SSH Key*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.sshkey || ""} onChange={e => setFormData({ ...formData, sshkey: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Server IP Address</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.serverip || ""} onChange={e => setFormData({ ...formData, serverip: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Server Path</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.serverpath || ""} onChange={e => setFormData({ ...formData, serverpath: e.target.value })} />
      </Form.Group>
      
      <Form.Group controlId="repoField">
        <Form.Label>Artifacts Details*</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.artifacts || ""} onChange={e => setFormData({ ...formData, artifacts: e.target.value })} />
      </Form.Group>
      {/* <small className="form-text text-muted mt-2 text-left pb-2">specify SSH commands to run for step</small> */}

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

SshUploadDeploy.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default SshUploadDeploy;
