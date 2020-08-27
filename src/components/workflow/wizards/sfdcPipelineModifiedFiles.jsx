import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTimes, faStepBackward, faPlus, faMinus, faPen, faCode } from "@fortawesome/free-solid-svg-icons";
import "../workflows.css";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";


const SfdcPipelineModifiedFiles = ({ handleClose, setView, modifiedFiles, createJenkinsJob }) => {
  const [error, setError] = useState(false); 
  const [save, setSave] = useState(false);
  const [gitModified, setGitModified] = useState([]);
  const [sfdcModified, setSfdcModified] = useState([]);
  const [fromSFDC, setFromSFDC] = useState(false);
  
  
  
  useEffect(() => {
    console.log(modifiedFiles);
    setGitModified(modifiedFiles.gitModified);
    setSfdcModified(modifiedFiles.sfdcModified);
  }, [modifiedFiles]);

  

  const handleApproveChanges = () => {
    //this needs to do the ifnal work writing data to the stepID above: checked compontents, other job data

    //trigger the jenkins job to create job
    createJenkinsJob(fromSFDC);  
  };

  return (    
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
        
          <div className="h5">SalesForce Pipeline Run: File Comparison</div>
          <div className="text-muted mb-4">Listed below are the files with changes impacted in this pipeline run.  Please confirm that you 
          want to proceed with this operation.</div>
          <div className="px-2">
            <Form.Group controlId="nameSpacePrefix">
              <Form.Check
                type="checkbox"
                label="Push From SFDC"
                name="fromSFDC"
                // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                checked={fromSFDC ? fromSFDC : false}
                onChange={(e) =>
                  setFromSFDC(e.target.checked)
                }
              />
                  </Form.Group>
          </div>
          {error && <div className="mt-3"><ErrorDialog error={error} /></div>}
          {save && <LoadingDialog />}
          
          { modifiedFiles && 
          <>
            <div className="d-flex w-100 pr-2">
              <div className="col-7 list-item-container mr-1">
                <div className="h6 opsera-blue">Git Files</div>
                {(gitModified && gitModified.length === 0) && <div className="info-text mt-3">NO FILES</div>}
                {typeof(gitModified) === "object" && gitModified.map((item, idx) => (
                  <div key={idx} className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                    {item.commitAction && item.commitAction === "added" && <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green"/>}
                    {item.commitAction && item.commitAction === "modified" && <FontAwesomeIcon icon={faPen} fixedWidth className="mr-1 yellow"/>}
                    {item.commitAction && item.commitAction === "deleted" && <FontAwesomeIcon icon={faMinus} fixedWidth className="mr-1 dark-grey"/>}                    
                    {item.componentType}: {item.committedFile}
                  </div>
                ))} 

              </div>
              <div className="col-5 list-item-container">
                <div className="h6 opsera-blue">SFDC Files</div>
                {/* sfdcModified.map */}
                {(sfdcModified && sfdcModified.length === 0) && <div className="info-text mt-3">NO FILES</div>}
                {typeof(sfdcModified) === "object" && sfdcModified.map((item, idx) => (
                  <div key={idx} className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                    {(item.commitAction && item.commitAction === "active") ? 
                      <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green"/> : <FontAwesomeIcon icon={faCode} fixedWidth className="mr-1 dark-grey"/> }
                    {item.componentType}: {item.committedFile}
                  </div>
                ))} 
              </div>
            </div>
            
          </>}
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
        <div className="px-2">
            <Form.Group controlId="nameSpacePrefix">
              <Form.Check
                type="checkbox"
                label="Push From SFDC"
                name="fromSFDC"
                // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                checked={fromSFDC ? fromSFDC : false}
                onChange={(e) =>
                  setFromSFDC(e.target.checked)
                }
              />
            </Form.Group>
          </div>
          <Button variant="secondary" size="sm" className="mr-2"
            onClick={() => {  setView(1); }}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back</Button>

          <Button variant="success" size="sm"
            onClick={() => {  setSave(true); handleApproveChanges(); }}
            disabled={save}>
            {save ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>}Proceed</Button>

          <Button variant="outline-secondary" size="sm" className="ml-2"
            onClick={() => {  handleClose(); }}>
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Cancel</Button>

        </div>
      </div> 
    </div>   
  );
};

SfdcPipelineModifiedFiles.propTypes = {
  setView: PropTypes.func,
  modifiedFiles: PropTypes.object,
  handleClose: PropTypes.func,
  createJenkinsJob: PropTypes.func
};


export default SfdcPipelineModifiedFiles;