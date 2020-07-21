import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Button, OverlayTrigger, Popover, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward, faPlay, faSync, faSpinner, faStopCircle, faHistory, faPause, faFlag } from "@fortawesome/free-solid-svg-icons";

import "../workflows.css";


const SfdcPipelineStart = ({ pipelineId, handlePipelineWizardRequest }) => {
  const contextType = useContext(AuthContext);
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(false); 
  const [componentTypes, setComponentTypes] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {
    setLoading(true);
    let apiUrl = "/pipelines/sfdc/component-types";

    try {
      const accessToken = await getAccessToken(); //this calls the persistent AuthContext state to get latest token (for passing to Node)
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      console.log(response.data);
      setComponentTypes(response.data);
    } catch (error) {
      console.log("Error getting API Data: ", error);
      setError(error);
    }
    setLoading(false);
    
  };

  return (    
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
        
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>
          <div className="mx-5 mt-3">          
            <div className="d-flex flex-wrap">
              {componentTypes.map((item, idx) => (
                <div key={idx} className="p-2 w-25">
                  <input type="checkbox" className="form-check-input" id={idx} />
                  <label className="form-check-label" htmlFor={idx}>{item}</label>
                </div>
              ))} 
            </div>

            {/* <ul className="nav nav-tabs w-100">
              <li className="nav-item">
                <div className="nav-link active">Accounts</div>
              </li>
              <li className="nav-item">
                <a className="nav-link">Account Details</a>
              </li>
            </ul> */}
          
            {/* <Button variant="success" className="mr-2" size="sm"
            onClick={() => {  setStart(true); handlePipelineWizardRequest(pipelineId, true); }}
            disabled={false}>
            {start ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/>}Start from Beginning</Button>

          <Button variant="primary" className="ml-2" size="sm"
            onClick={() => { setResume(true); handlePipelineWizardRequest(pipelineId, false);  }}
            disabled={false}>
            {resume ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>}Resume Existing Run</Button> */}
          </div>
        </div>
        <div className="flex-container-bottom"></div>
      </div> 
    </div>   
  );
};


SfdcPipelineStart.propTypes = {
  pipelineId: PropTypes.string,
  handlePipelineWizardRequest: PropTypes.func
};

export default SfdcPipelineStart;