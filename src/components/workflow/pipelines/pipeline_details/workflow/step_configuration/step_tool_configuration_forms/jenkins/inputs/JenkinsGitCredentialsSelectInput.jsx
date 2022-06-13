import React,{ useEffect,useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

const excludeArr = ["SFDC VALIDATE PACKAGE XML", "SFDC UNIT TESTING", "SFDC DEPLOY", "SFDC DATA TRANSFORMER"];

// TODO: Make JenkinsToolAccountSelectInput
function JenkinsGitCredentialsSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  jenkinsList,
  toolConfigId,
  jobType,
}) {
  const [accountsList, setAccountsList] = useState([]);

  useEffect(()=>{
    setAccountsList([]);

    if(Array.isArray(jenkinsList) && jenkinsList.length > 0){
      const accounts = jenkinsList[jenkinsList.findIndex((x) => x.id === toolConfigId)]?.accounts;

      if (Array.isArray(accounts) && accounts.length > 0) {
        setAccountsList(accounts);
      }
    }
  },[jenkinsList, toolConfigId]);

  const setDataFunction = (fieldName, value) => {
    let newDataObject = {...dataObject};

    newDataObject.setData("repoId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitToolId", value.toolId);
    newDataObject.setData("gitCredential", value.gitCredential);
    newDataObject.setData("gitUserName", value.gitUserName);
    newDataObject.setData("service", value.service);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = { ...dataObject };

    newDataObject.setData("repoId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitUserName", "");
    newDataObject.setData("service", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitCredential",  "");
    newDataObject.setData("gitUserName",  "");
    newDataObject.setData("service", "");

    setDataObject({ ...newDataObject });
  };

  const getNoCredentialsMessage = () => {
    if (accountsList.length === 0) {
      return (
        <small className="text-muted p-2">         
          <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          No Credentials have been created for <span>{dataObject?.getData("jenkinsUrl")}</span>. Please go to
          <Link to="/inventory/tools"> Tool Registry</Link> and add credentials for this Jenkins in order to proceed.
        </small>
      );
    } 
  };

  const checkValidity = ()=>{
    return dataObject !== null
    && dataObject?.getData("jenkinsUrl")
    && Array.isArray(jenkinsList) 
    && jenkinsList.length > 0
    && jobType
    && jobType.length >= 0
    && !excludeArr.includes(jobType)
    && !dataObject?.getData("isOrgToOrg"); 
  };

  if(!checkValidity()){
    return null;
  }

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={setDataFunction}
        setDataObject={setDataObject}
        placeholderText={"Select Account"}
        groupBy={"service"}
        selectOptions={accountsList}
        valueField={"gitCredential"}
        textField={"gitCredential"}
        clearDataFunction={clearDataFunction}
        disabled={disabled || accountsList.length===0}
      />
      {getNoCredentialsMessage()}
    </>
  );
    
}

JenkinsGitCredentialsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
  toolConfigId: PropTypes.string,
  jobType: PropTypes.string,
};

JenkinsGitCredentialsSelectInput.defaultProps = {
  fieldName: "gitCredential",
};

export default JenkinsGitCredentialsSelectInput;
