import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import JenkinsCreateAccount from "./jenkinsCreateAccount";
import JenkinsCreateJob from "./jenkinsCreateJob";
import "components/inventory/tools/tools.css";

function JenkinJobs(props) {
  const { toolId, toolData, accessToken } = props;
  const [ jobAction, setJobAction ] = useState("");

  return (
    <div className="pr-4 pl-4">
      <br />
      <Form className="newToolFormContainer">
        <Form.Group  controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Job Actions
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control as="select" disabled={false} value={jobAction} onChange={e => setJobAction( e.target.value)} placeholder="Select One">
              <option name="Select One" value="" disabled={true}>Select One</option>
              <option name="Create Account" value="CREATE_ACCOUNT" >Create Account</option>
              <option name="Create Job" value="CREATE_JOB">Create Job </option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
      <br />

      {(jobAction === "CREATE_ACCOUNT") && <> 
        <JenkinsCreateAccount jobAction={jobAction} setJobAction={(action) => setJobAction(action)} />
      </>}

      {(jobAction === "CREATE_JOB" ) && <> 
        <JenkinsCreateJob jobAction={jobAction} setJobAction={(action) => setJobAction(action)} />
      </>}      
      
    </div>
  );
}



export default JenkinJobs;
