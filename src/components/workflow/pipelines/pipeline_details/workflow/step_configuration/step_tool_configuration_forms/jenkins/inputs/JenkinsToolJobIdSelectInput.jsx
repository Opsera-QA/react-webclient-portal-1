import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DialogToastContext } from "contexts/DialogToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { RegistryPopover } from "../utility";
import { faExclamationCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function JenkinsToolJobIdSelectInput({ fieldName, jenkinsList, dataObject, setDataObject, disabled, toolConfigId }) {
  const [jobsList, setJobsList] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const job_type = dataObject.data.job_type;

  useEffect(()=>{
    setJobsList([]);

    if(Array.isArray(jenkinsList) && jenkinsList.length > 0){
      const jobs = jenkinsList[jenkinsList.findIndex((x) => x.id === toolConfigId)]?.jobs;

      if (Array.isArray(jobs) && jobs.length > 0) {
        setJobsList(jobs);
      }
    }
  },[jenkinsList, toolConfigId]);

  useEffect(() => {
    const toolJobId = dataObject?.getData("toolJobId");
    if (
      jobsList?.length > 0 &&
      toolJobId?.length > 0 &&
      !jobsList[jobsList.findIndex((x) => x._id === toolJobId)]
    ) {
      toastContext.showLoadingErrorDialog(
        "Preselected job is no longer available.  It may have been deleted.  Please select another job from the list or recreate the job in Tool Registry."
      );
    }
  }, [jobsList, dataObject && dataObject.getData("toolJobId")]);

  useEffect(() => {
    if (dataObject.data.toolJobType && dataObject.data.toolJobType.includes("SFDC")) {
      let newDataObject = { ...dataObject };
      newDataObject.setData("buildType", "ant");
      setDataObject({ ...newDataObject });      
    }
  }, [dataObject.data.toolJobType]);

  const setDataFunction = (fieldName, selectedOption) => {
    
    let newDataObject = { ...dataObject };
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("toolJobType", selectedOption.type);
    newDataObject.setData("jobType", selectedOption.type[0]);
    newDataObject.setData("rollbackBranchName", "");
    newDataObject.setData("stepIdXML", "");
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("buildToolVersion", "6.3");
    newDataObject.setData("buildArgs", {});
    // TODO: There is probably a less confusing way of doing this
    if ("configuration" in selectedOption) {
      const keys = Object.keys(selectedOption.configuration);
      keys.forEach((item) => {
        if (!["toolJobId", "toolJobType", "jobType"].includes(item)) {
          newDataObject.setData(item, selectedOption.configuration[item]);
        }
      });
    }
    
    newDataObject.setData("stepIdXML", "");
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("buildToolVersion", "6.3");
    newDataObject.setData("buildArgs", {});

    setDataObject({ ...newDataObject });
  };

  const renderNoJobsMessage = () => {
    if (jobsList.length === 0) {
      return (
        <small className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No jobs have been created for <span>{dataObject.getData("jenkinsUrl")}</span>. Please go to
          <Link to={"/inventory/tools/details/" + dataObject.getData("toolConfigId")}> Tool Registry</Link> and add
          credentials and register a job for this Jenkins in order to proceed.{" "}
        </small>
      );
    }
  };

  // TODO: This should probably be inline
  const renderOverlayTrigger = () => {
    const toolJobId = dataObject.getData("toolJobId");
    return (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={RegistryPopover(jobsList[jobsList.findIndex((x) => x._id === toolJobId)])}
      >
        <FontAwesomeIcon
          icon={faEllipsisH}
          className="fa-pull-right pointer pr-1"
          onClick={() => document.body.click()}
        />
      </OverlayTrigger>
    );
  };
  
  if (job_type !== "opsera-job") {
    return <></>;
  }
  return (
    <>
      {renderOverlayTrigger()}
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={setDataFunction}
        setDataObject={setDataObject}
        placeholderText={jobsList.length === 0 ? "No jobs have been created" :"Select Job Type"}
        selectOptions={jobsList}
        valueField="_id"
        textField="name"
        disabled={disabled || jobsList.length === 0 }
      />
      {renderNoJobsMessage()}
    </>
  );
}

JenkinsToolJobIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
  toolConfigId: PropTypes.string
};

JenkinsToolJobIdSelectInput.defaultProps = {
  fieldName: "toolJobId",
};

export default JenkinsToolJobIdSelectInput;
