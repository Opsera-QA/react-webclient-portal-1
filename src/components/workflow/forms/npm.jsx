import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function NPMStepConfiguration( { data, parentCallback }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  
  const [commands, setCommands] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      let { configuration, threshold } = data;
      if (typeof(configuration) !== "undefined") {
        setCommands(configuration.commands);
        setPath(configuration.path);
      } else {
        setCommands("");
        setPath("");
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
        commands: commands,
        path: path
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
        <Form.Label>NPM Commands*</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={commands} onChange={e => setCommands(e.target.value)} isInvalid={commands.length > 100} />
      </Form.Group>
      <small className="form-text text-muted mt-2 text-left pb-2">specify npm commands to run</small>

      <Form.Group controlId="repoField">
        <Form.Label>Path to Node.js NPM*</Form.Label>
        <Form.Control type="text" placeholder="" value={path} onChange={e => setPath(e.target.value)} isInvalid={path.length > 100} />
      </Form.Group>
      <small className="form-text text-muted mt-2 text-left pb-2">Specify path to Node.js NPM executable. Leave blank to use agent-installed one</small>


      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }} 
        disabled={(commands.length == 0 || path.length == 0 )}>
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