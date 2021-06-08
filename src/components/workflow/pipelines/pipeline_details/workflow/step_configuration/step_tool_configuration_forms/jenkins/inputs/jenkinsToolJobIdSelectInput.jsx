import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DialogToastContext } from "contexts/DialogToastContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { RegistryPopover } from "../utility";
import { faExclamationCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function JenkinsToolJobIdSelectInput({ fieldName, jenkinsList, dataObject, setDataObject, disabled, jobType }) {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (jenkinsList && jenkinsList.length > 0) {
      setJobsList(
        jenkinsList[jenkinsList.findIndex((x) => x.id === dataObject?.data.toolConfigId)]
          ? jenkinsList[jenkinsList.findIndex((x) => x.id === dataObject?.data.toolConfigId)].jobs
          : []
      );
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [jenkinsList, dataObject?.data.toolConfigId]);

  useEffect(() => {
    if (
      jobsList &&
      jobsList.length > 0 &&
      dataObject?.data.toolJobId &&
      dataObject?.data.toolJobId.length > 0 &&
      !jobsList[jobsList.findIndex((x) => x._id === dataObject?.data.toolJobId)]
    ) {
      toastContext.showLoadingErrorDialog(
        "Preselected job is no longer available.  It may have been deleted.  Please select another job from the list or recreate the job in Tool Reigstry."
      );
      return;
    }
  }, [jobsList, dataObject?.data.toolJobId]);

  

  const handleDTOChange = (fieldName, value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("toolJobId", value._id);
    newDataObject.setData("toolJobType", value.type);
    newDataObject.setData(jobType, value.type[0]);
    if ("configuration" in value) {
      const keys = Object.keys(value.configuration);
      keys.forEach((item) => {
        if (!["toolJobId", "toolJobType", "jobType"].includes(item)) {
          newDataObject.setData(item, value.configuration[item]);
        }
      });
    }
    newDataObject.setData("rollbackBranchName", "");
    newDataObject.setData("stepIdXML", "");
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("buildToolVersion", "6.3");
    newDataObject.setData("buildArgs", {});
    setDataObject({ ...newDataObject });
  };

  const renderNoJobsMessage = () => {
    if (!isLoading && jobsList.length < 1) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No jobs have been created for <span>{dataObject.getData("jenkinsUrl")}</span>. Please go to
          <Link to={"/inventory/tools/details/" + dataObject.getData("toolConfigId")}> Tool Registry</Link> and add
          credentials and register a job for this Jenkins in order to proceed.{" "}
        </div>
      );
    }
  };

  const renderOverLayTrigger = () => {
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
  
  if (jobType != "opsera-job") {
    return <></>;
  }

  return (
    <>
      {renderOverLayTrigger()}
      {renderNoJobsMessage()}
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={handleDTOChange}
        setDataObject={setDataObject}
        placeholderText={"Select Job Type"}
        selectOptions={jobsList}
        valueField="_id"
        textField="name"
        disabled={disabled || isLoading}
        busy={isLoading}
      />
    </>
  );
}

JenkinsToolJobIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
  jobType: PropTypes.string,
};

JenkinsToolJobIdSelectInput.defaultProps = {
  fieldName: "toolJobId", //job
  disabled: false,
  jobType: undefined,
};

export default JenkinsToolJobIdSelectInput;
