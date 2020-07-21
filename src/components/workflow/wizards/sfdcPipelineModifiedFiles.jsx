import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTimes, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import "../workflows.css";
import LoadingDialog from "components/common/loading";
import ErrorDialog from "components/common/error";




const SfdcPipelineModifiedFiles = ({ pipelineId, stepId, handleClose, setView, modifiedFiles, createJenkinsJob }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(false); 
  const [configurationError, setConfigurationError] = useState(false); 
  const [save, setSave] = useState(false);
  
  
  

  
  useEffect(() => {
    setConfigurationError(false);
    //loadData();
    //loadRegistryData();
    
  }, []);

  


  const handleSubmitComponentTypes = () => {
  
  };

  const handleApproveChanges = () => {
    //this needs to do the ifnal work writing data to the stepID above: checked compontents, other job data

    //trigger the jenkins job to create job
    createJenkinsJob();
    
  };
  
  return (    
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"> STEP 2</div>
        <div className="flex-container-content">
        
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>

          {error && <div className="mt-3"><ErrorDialog error={error} /></div>}
          
          { !configurationError && 
          <>
            <div className="mx-3 mt-3">        
              <div className="mb-3" style={{ display: "flex" }}>
                <div className="px-2" style={{ flex: "50%" }}>
                  <div className="text-muted pl-1 pb-1">Select Date Filter:</div>
                </div>
                <div className="px-2" style={{ flex: "50%" }}>
                  <div className="text-muted pl-1 pb-1">Select SalesForce Account (configured in Registry):</div>
                  {/* <AccountDropDown data={registryData} setAccount={handleSetAccount} isLoading={loadingRegistry} /> */}
                </div>
              </div>
            </div>
            <div className="mx-5 mt-3">  
              <div className="text-muted ">Select Component Types:</div>
              <div className="d-flex flex-wrap">
                {loading ? <LoadingDialog size="sm" /> : 
                  <>
                    {JSON.stringify(modifiedFiles, null, 2)}
                  </> } 
              </div>          
            </div>
          </>}
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button variant="secondary" size="sm" className="mr-2"
            onClick={() => {  setView(1); }}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back</Button>

          <Button variant="success" size="sm"
            onClick={() => {  setSave(true); handleApproveChanges(); }}
            disabled={false}>
            {save ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>}Approve</Button>

          <Button variant="outline-secondary" size="sm" className="ml-2"
            onClick={() => {  handleClose(); }}>
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Cancel</Button>

        </div>
      </div> 
    </div>   
  );
};


const AccountDropDown = ({ data, setAccount, isLoading }) => {

  return (
    <DropdownList
      data={data} busy={isLoading}
      valueField='id'
      textField='name'
      onChange={setAccount}             
    /> 
  );
};

SfdcPipelineModifiedFiles.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  modifiedFiles: PropTypes.array,
  handleClose: PropTypes.func,
  createJenkinsJob: PropTypes.func
};

AccountDropDown.propTypes = {
  data: PropTypes.array,
  setAccount: PropTypes.func,
  isLoading: PropTypes.bool
};

export default SfdcPipelineModifiedFiles;