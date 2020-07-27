import React, { useState, useEffect } from "react";
import { Col, Form, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import JenkinsCreateAccount from "./jenkinsCreateAccount/jenkinsCreateAccount";
import JenkinsCreateJob from "./jenkinsCreateJob/jenkinsCreateJob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import JenkinsJobsTable from "./jenkinsJobsTable";
import JenkinsAccountsTable from "./jenkinsAccountsTable";

import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";

function JenkinJobs({ toolData }) {
  
  const [ jobAction, setJobAction ] = useState("JOB_LIST");
  const [ jobData, setJobData ] = useState({});

  const selectedJobRow = (rowData) => {
    setJobAction("CREATE_JOB");
    setJobData(rowData.original);
  };

  useEffect(() => {
    if(jobAction == "") { 
      setJobAction("JOB_LIST");
      setJobData({}); 
    }
  }, [jobAction]);

  return (
    <div className="pr-4 pl-4">
      <br />
      {/* {jobAction === "" && */}
      {/* <Form className="newToolFormContainer">
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
      </Form> */}
      {/* } */}
      <br />
      
      {(jobAction === "CREATE_ACCOUNT") && <> 
        <JenkinsCreateAccount toolId={toolData._id} toolData={toolData} jobAction={jobAction} setJobAction={(action) => setJobAction(action)} />
      </>}

      {(jobAction === "CREATE_JOB" ) && <> 
        <JenkinsCreateJob toolId={toolData._id} toolData={toolData} jobAction={jobAction} setJobAction={(action) => setJobAction(action)} jobData={jobData} />
      </>}      

      {(jobAction === "JOB_LIST" || jobAction === "ACCOUNT_LIST" ) && <> <ButtonToolbar className="justify-content-between">
        <ButtonGroup>
          <Button size="sm" className="mr-2" variant={jobAction === "JOB_LIST" ? "primary" : "secondary"} onClick={() => setJobAction("JOB_LIST")}>Jobs</Button>
          <Button size="sm" className="mr-2" variant={jobAction === "ACCOUNT_LIST" ? "primary" : "secondary"} onClick={() => setJobAction("ACCOUNT_LIST")}>Accounts</Button>
        </ButtonGroup>
      </ButtonToolbar>
      </>}  

      {(jobAction === "JOB_LIST" && toolData.jobs !== undefined ) && <> 
        <div className="my-1 text-right">
          <Button variant="primary" size="sm"  
            onClick={() => setJobAction("CREATE_JOB")}> 
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> Create Job
          </Button>
          <br />
        </div>
        <JenkinsJobsTable data={toolData.jobs} selectedRow={rowData => selectedJobRow(rowData)} />
      </>}

      {(jobAction === "ACCOUNT_LIST" && toolData.accounts !== undefined ) && <> 
        <div className="my-1 text-right">
          <Button variant="primary" size="sm"  
            onClick={() => setJobAction("CREATE_ACCOUNT")}> 
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> Create Account
          </Button>
          <br />
        </div>
        <JenkinsAccountsTable data={toolData.accounts} />
      </>}    

    </div>
  );
}


JenkinJobs.propTypes = {
  toolData: PropTypes.object
};
export default JenkinJobs;
