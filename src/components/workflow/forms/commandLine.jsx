import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function CommandLineStepConfiguration( { data, parentCallback }) {
  console.log(data);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  
  const [buildScript, setBuildScript] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      let { configuration, threshold } = data;
      if (typeof(configuration) !== "undefined") {
        setBuildScript(configuration.buildScript);
      } else {
        setBuildScript("");
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    }
  }, [data]);

  const callbackFunction = () => {
    const item = {
      configuration: {
        buildScript : buildScript
      },
      threshold: {
        type: thresholdType,
        value: thresholdVal
      }
    };
    parentCallback(item);
  };
  
  return (
    <Form>
      <Form.Group controlId="repoField">
        <Form.Label>Enter build script content*</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={buildScript} onChange={e => setBuildScript(e.target.value)} isInvalid={buildScript.length > 500} />
      </Form.Group>
     
      <small className="form-text text-muted mt-2 text-left pb-2">A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments</small>
     
      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }} 
        disabled={(buildScript.length === 0)}>
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

CommandLineStepConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default CommandLineStepConfiguration;