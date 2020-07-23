import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import JenkinsCreateAccount from "./jenkinsCreateAccount/jenkinsCreateAccount";
import JenkinsCreateJob from "./jenkinsCreateJob/jenkinsCreateJob";

import JenkinsJobsTable from "./jenkinsJobsTable";
import "components/inventory/tools/tools.css";
import PropTypes from "prop-types";

function JenkinJobs({ toolData }) {
  
  const [ jobAction, setJobAction ] = useState("");
  const [ jobData, setJobData ] = useState({});

  const selectedRow = (rowData) => {
    setJobAction("CREATE_JOB");
    setJobData(rowData.original);
  };

  useEffect(() => {
    if(jobAction == "") { setJobData({}); }
  }, [jobAction]);

  return (
    <div className="pr-4 pl-4">
      <br />
      {jobAction === "" &&
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
      }
      <br />

      {(jobAction === "CREATE_ACCOUNT") && <> 
        <JenkinsCreateAccount toolData={toolData} jobAction={jobAction} setJobAction={(action) => setJobAction(action)} />
      </>}

      {(jobAction === "CREATE_JOB" ) && <> 
        <JenkinsCreateJob toolData={toolData} jobAction={jobAction} setJobAction={(action) => setJobAction(action)} jobData={jobData} />
      </>}      

      {(jobAction === "" && toolData.jobs !== undefined ) && <> 
        <JenkinsJobsTable data={toolData.jobs} selectedRow={rowData => selectedRow(rowData)} />
      </>}

    </div>
  );
}


JenkinJobs.propTypes = {
  toolData: PropTypes.object
};
export default JenkinJobs;
