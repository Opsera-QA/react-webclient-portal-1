import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function JunitXunitStepConfiguration( { data, parentCallback }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [urlVal, setUrlVal] = useState("");
  const [portVal, setPortVal] = useState("");
  const [userIdVal, setUserIdVal] = useState("");
  const [authTokenVal, setAuthTokenVal] = useState("");
  const [jobVal, setJobVal] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      let { configuration, threshold } = data;
      if (typeof(configuration) !== "undefined") {
        setUrlVal(configuration.jenkinsUrl);
        setPortVal(configuration.jenkinsPort);
        setUserIdVal(configuration.jUserId);
        setAuthTokenVal(configuration.jAuthToken);
        setJobVal(configuration.jobName);
      } else {
        setUrlVal("");
        setPortVal("");
        setUserIdVal("");
        setAuthTokenVal("");
        setJobVal("");
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
        jenkinsUrl: urlVal,
        jenkinsPort: portVal,
        jUserId: userIdVal,
        jAuthToken: authTokenVal,
        jobName: jobVal
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
        <Form.Label>Jenkins Container URL*</Form.Label>
        <Form.Control type="text" placeholder="" value={urlVal} onChange={e => setUrlVal(e.target.value)} isInvalid={urlVal.length > 100} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Port</Form.Label>
        <Form.Control type="text" placeholder="" value={portVal} onChange={e => setPortVal(e.target.value)} isInvalid={portVal.length > 5} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins User ID*</Form.Label>
        <Form.Control type="text" placeholder="" value={userIdVal} onChange={e => setUserIdVal(e.target.value)} isInvalid={userIdVal.length > 50} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Token*</Form.Label>
        <Form.Control type="text" placeholder="" value={authTokenVal} onChange={e => setAuthTokenVal(e.target.value)} isInvalid={authTokenVal.length > 500} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Job Name</Form.Label>
        <Form.Control type="text" placeholder="" value={jobVal} onChange={e => setJobVal(e.target.value)} isInvalid={jobVal.length > 150} />
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }} 
        disabled={(urlVal.length == 0 || userIdVal.length == 0 || authTokenVal.length == 0 || urlVal.length > 100 || portVal.length > 5 || userIdVal.length > 50 || authTokenVal.length > 500 || jobVal.length > 150)}>
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

JunitXunitStepConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default JunitXunitStepConfiguration;