// This is where the custom ToolsConfiguration.configuration form will reside for this tool.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function JenkinsToolConfiguration( { toolData, toolId, parentCallback }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      let { configuration } = toolData;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }      
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [toolData]);


  const callbackFunction = () => {
    if (validateRequiredFields()) {
      const item = {
        configuration: FormData
      };
      parentCallback(item); //todo: This needs to be calling the parent toolDetailsConfiguration.jsx function to save the data back to API
    }
  };


  const validateRequiredFields = () => {
    let { jenkinsUrl, jUserId, jAuthToken } = formData;
    if (jenkinsUrl.length === 0 || jUserId.length === 0 || jAuthToken.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };



  return (
    <Form>
      { formMessage.length > 0 ? <p className="error-text">{formMessage}</p> : null}

      <Form.Group controlId="repoField">
        <Form.Label>Jenkins Container URL*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.jenkinsUrl || ""} onChange={e => setFormData({ ...formData, jenkinsUrl: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Port</Form.Label>
        <Form.Control maxLength="5" type="text" placeholder="" value={formData.jenkinsPort || ""} onChange={e => setFormData({ ...formData, jenkinsPort: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.jUserId || ""} onChange={e => setFormData({ ...formData, jUserId: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Token*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.jAuthToken || ""} onChange={e => setFormData({ ...formData, jAuthToken: e.target.value })} />
      </Form.Group>
            
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

JenkinsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  parentCallback: PropTypes.func
};

export default JenkinsToolConfiguration;