import React,{ useEffect,useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function JenkinsGitCredeintailSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  jenkinsList
}) {
  const [accountsList,setAccountsList]=useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobType = dataObject.getData("jobType");
  const jenkinsUrl = dataObject.getData("jenkinsUrl");
  const excludeArr = ["SFDC VALIDATE PACKAGE XML", "SFDC UNIT TESTING", "SFDC DEPLOY"];
  const isOrgToOrg = dataObject.getData("isOrgToOrg");

  useEffect(()=>{
    if(jenkinsList && jenkinsList.length>0){  
      setAccountsList(
        jenkinsList[jenkinsList.findIndex((x) => x.id === dataObject?.data.toolConfigId)]
          ? jenkinsList[jenkinsList.findIndex((x) => x.id === dataObject?.data.toolConfigId)].accounts
          : []
      );
     
      setIsLoading(false);
    } else {
      setIsLoading(true); 
    }
  },[jenkinsList, dataObject?.data.toolConfigId]);
  
  const handleDTOChange = (fieldName, value) => {
    let newDataObject = { ...dataObject };
    const emptyFields = [
      "repoId",
      "gitUrl",
      "sshUrl",
      "repository",
      "workspace",
      "workspaceName",
      "branch",
      "projectId",
      "defaultBranch",
    ];
    newDataObject.setData("gitToolId", value.toolId);
    newDataObject.setData("gitCredential", value.gitCredential);
    newDataObject.setData("gitUserName", value.gitUserName);
    newDataObject.setData("service", value.service);
    emptyFields.forEach((item) => newDataObject.setData(item), "");
    setDataObject({ ...newDataObject });
  };
  const clearDataFunction = (fieldName) => {
    let newDataObject = { ...dataObject };
    const emptyFields = [
      "repoId",
      "gitUrl",
      "sshUrl",
      "repository",
      "workspace",
      "workspaceName",
      "branch",
      "projectId",
      "defaultBranch",
    ];
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitUserName", "");
    newDataObject.setData("service", "");
    emptyFields.forEach((item) => newDataObject.setData(item), "");
    setDataObject({ ...newDataObject });
  };
  const renderNotification = () => {
    if (!isLoading && accountsList.length < 1) {
      return (
        <div className="form-text text-muted p-2">
          <Form.Label className="w-100">Account*</Form.Label>
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No Credentials have been created for <span>{jenkinsUrl}</span>. Please go to
          <Link to="/inventory/tools"> Tool Registry</Link> and add credentials for this Jenkins in order to proceed.
        </div>
      );
    } 
  };
  const valid=()=>{
    return  jenkinsUrl &&  jenkinsList && jenkinsList.length >0 && jobType && jobType.length > 0 && !excludeArr.includes(jobType) && !isOrgToOrg;
  };

  if(!isLoading && !valid()){
    return null;
  }  
    
  return (
    <>
      {renderNotification()}
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={handleDTOChange}
        setDataObject={setDataObject}
        placeholderText={"Select Account"}
        selectOptions={accountsList}
        valueField="gitCredential"
        textField="gitCredential"
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading}
        busy={isLoading}
      />
    </>
  );
    
}

JenkinsGitCredeintailSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
};

JenkinsGitCredeintailSelectInput.defaultProps = {
  fieldName: "gitCredential", //Account
  disabled: false,
};

export default JenkinsGitCredeintailSelectInput;
