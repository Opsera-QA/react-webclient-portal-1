import React,{useEffect, useState, useContext} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, OverlayTrigger, Popover, Row, Col, Tooltip } from "react-bootstrap";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineActions from "components/workflow/pipeline-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { DialogToastContext } from "../../../../../../../../../contexts/DialogToastContext";

import {
    faExclamationCircle,
    
  } from "@fortawesome/free-solid-svg-icons";

function JenkinsStepConfRepository({ fieldName, dataObject, setDataObject, disabled }) {
    const { getAccessToken } = useContext(AuthContext);
    const [isRepoSearching,setIsRepoSearching]=useState(false);

    const [repoList, setRepoList] = useState([]);
    const jobType = dataObject.getData('jobType');
    const toastContext = useContext(DialogToastContext);

    const excludeArr = ["SFDC VALIDATE PACKAGE XML","SFDC UNIT TESTING","SFDC DEPLOY"];
    const isOrgToOrg = dataObject.getData('isOrgToOrg');
    const gitToolId =dataObject.getData('gitToolId');
    const service = dataObject.getData('service');
    const workspace =dataObject.getData('workspace');
    const gitCredential = dataObject.getData('gitCredential');

    
    useEffect(() => {
      //setShowToast(false)
  
      async function fetchRepos(service, gitToolId, workspaces) {
        setIsRepoSearching(true);
        // Set results state
        let results = await pipelineActions.searchRepositories(service, gitToolId, workspaces, getAccessToken);
        if (typeof(results) != "object") {
          setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
          let errorMessage = "Repository information is missing or unavailable!";
          toastContext.showErrorDialog(errorMessage);
          setIsRepoSearching(false);
          return;
        }
          //console.log(results);
          setRepoList(results);
          setIsRepoSearching(false);
      }
  
      if (
        service &&
        service.length > 0 &&
        gitToolId &&
        gitToolId.length > 0
      ) {
        // Fire off our API call
        fetchRepos(service, gitToolId, workspace);
      } else {
        setIsRepoSearching(true);
        setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      }
    }, [service, gitToolId, gitCredential, workspace]);

      const handleDTOChange = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        
          newDataObject.setData("repository", selectedOption.name);
          newDataObject.setData("repoId", selectedOption.id);
          newDataObject.setData("projectId", selectedOption.id);
          newDataObject.setData("gitUrl", selectedOption.httpUrl || "");
          newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
          newDataObject.setData("branch", "");
          newDataObject.setData("defaultBranch", "");
          newDataObject.setData("gitBranch", "");
          setDataObject({...newDataObject});
        
      };

      if(service && gitToolId && !excludeArr.includes(jobType) && 
      (service === "bitbucket"?  workspace && workspace.length > 0 : true ) && 
      !isOrgToOrg){
        
        return  isRepoSearching ? (
          <Form.Group controlId="account" className="mt-2">
            <Form.Label>Repository*</Form.Label> 
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                Loading repositories from registry
              </div>
          </Form.Group>):(
            <>
            {repoList ? (
              <SelectInputBase
              fieldName={fieldName}
              dataObject={dataObject}
              setDataFunction={handleDTOChange}
              setDataObject={setDataObject}
              placeholderText={"Select"}
              selectOptions={repoList}
              valueField="value"
              textField="name"
              disabled={disabled}
            />
              
            ) : (
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
            )}
          </>
          );
        
      }
  
  return null;
}

JenkinsStepConfRepository.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

JenkinsStepConfRepository.defaultProps = {
  fieldName: "repository",
  disabled:false,
  
};

export default JenkinsStepConfRepository;
