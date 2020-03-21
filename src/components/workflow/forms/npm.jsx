import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  commands: "",
  path: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function NPMStepConfiguration( { data, parentCallback }) {
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
    let { commands } = formData;
    if (commands.length === 0) {
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
        <Form.Label>NPM Commands*</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={formData.commands || ""} onChange={e => setFormData({ ...formData, commands: e.target.value })} />
      </Form.Group>
      <small className="form-text text-muted mt-2 text-left pb-2">specify npm commands to run</small>

      <Form.Group controlId="repoField">
        <Form.Label>Path to Node.js NPM</Form.Label>
        <Form.Control type="text" placeholder="" value={formData.path || ""} onChange={e => setFormData({ ...formData, path: e.target.value })} />
      </Form.Group>
      <small className="form-text text-muted mt-2 text-left pb-2">Specify path to Node.js NPM executable. Leave blank to use agent-installed one</small>


      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

NPMStepConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default NPMStepConfiguration;