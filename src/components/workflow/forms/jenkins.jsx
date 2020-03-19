import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//data is JUST the tool.configuration object passed from parent component, that's returned through parent Callback
// ONLY the configuration object will get changed.  Any other fields in the pipeline, or tool object are NOT to change.
function JenkinsStepConfiguration( { data, parentCallback }) {
  const [urlVal, setUrlVal] = useState("");
  const [portVal, setPortVal] = useState("");
  const [userIdVal, setUserIdVal] = useState("");
  const [authTokenVal, setAuthTokenVal] = useState("");
  const [jobVal, setJobVal] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      setUrlVal(data.jenkinsUrl);
      setPortVal(data.jenkinsPort);
      setUserIdVal(data.jUserId);
      setAuthTokenVal(data.jAuthToken);
      setJobVal(data.jobName);
    }
  }, [data]);

  const callbackFunction = () => {
    const item = {
      jenkinsUrl: urlVal,
      jenkinsPort: portVal,
      jUserId: userIdVal,
      jAuthToken: authTokenVal,
      jobName: jobVal
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
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }} 
        disabled={urlVal.length == 0 || userIdVal.length == 0 || authTokenVal.length == 0}>
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

JenkinsStepConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default JenkinsStepConfiguration;