import React, {useContext, useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner, faLaptopMedical } from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import ToolRegistryConnectionLogOverlay from "components/common/buttons/connection/tool/ToolRegistryConnectionLogOverlay";
import { isObject } from "@okta/okta-auth-js";
import OctopusFeedPackageIdInputModal from "./OctopusFeedPackageIdInputModal";
import Model from "core/data_model/model";

function TestConnectionButton({ toolDataDto, disable }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isTesting, setIsTesting] = useState(false);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);
  const [showConnectionLog, setShowConnectionLog] = useState(false);
  const [log, setLog] = useState(["Starting connection test of tool...\n"]);
  const [showFeedPackageIdForm, setShowFeedPackageIdForm] = useState(false);
  const [feedPackageDto, setFeedPackageDto] = useState(undefined);

  useEffect(() => {
    setFeedPackageDto(new Model({packageId: ""}, {fields: [{
      label: "Package Id",
      id: "packageId",
      isRequired: true,
      regexDefinitionName: "generalText",
      formText: "Package Id must be in the format Group:Artifact e.g. com.google.guava:guava or junit:junit."
    }]}, false));
  }, []);

  const testConnection = async () => {
    try {      
      if(toolDataDto.getData("type") === 'feed' && feedPackageDto && feedPackageDto.getData("packageId") === "") {
        setShowFeedPackageIdForm(true);
        return;
      }
      setShowConnectionLog(true);
      setIsTesting(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);
      let response;
      let message;
      let status;

      if (toolDataDto != null) {
        response = await OctopusStepActions.validateItems(toolDataDto.getData("toolId"), toolDataDto.getData("spaceId"),toolDataDto.getData("type"),toolDataDto, getAccessToken, feedPackageDto.getData("packageId"));
        message = isObject(response?.data?.message)
        ? JSON.stringify(response?.data?.message)
        : response?.data?.message;
        status = response?.data?.status;
      }

      if (response && response.data != null && response.data.status === "Success") {
        
        setLog([
          ...log,
          "Connection Succeeded!\n",
          `Status : ${status}\n`,
          `Message: ${message}\n`,
          `Test Complete.  Please close this window to proceed.\n`,
        ]);
        setSuccessfulConnection(true);
      }
      else {        
        setLog([
          ...log,
          `Connection Failed!\n`,
          `Status : ${status}\n`,
          `Message: ${message}\n`,
          `Test Complete.  Please close this panel, address the issue and try again.\n`,
        ]);
        setFailedConnection(true);
      }
    }
    catch (error) {
      let message = isObject(error) ? JSON.stringify(error) : error;
      setLog([
        ...log,
        `Connection Failed!\n ${error}\n`,
        `Message: ${message}\n`,
        `Test Complete.  Please close this panel, address the issue and try again.\n`,
      ]);
      setFailedConnection(true);
    }
    finally {
      let newObj = {...feedPackageDto};
      newObj.setData("packageId", "");
      setFeedPackageDto({...newObj});
      setIsTesting(false);
    }

  };

  const handleAdditionalData = () => {
    setShowFeedPackageIdForm(false);    
    testConnection();
  };

  const getVariant = () => {
    if (successfulConnection) {
      return "success";
    }

    if (failedConnection) {
      return "danger";
    }

    return ("secondary");
  };

  const getLabel = () => {
    if (isTesting) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>{`Checking ${toolDataDto.getData("type") ? toolDataDto.getData("type").charAt(0).toUpperCase() + toolDataDto.getData("type").slice(1) : ""} Health`}</span>);
    }

    if (failedConnection) {
      return (<span><FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" fixedWidth/>{`${toolDataDto.getData("type") ? toolDataDto.getData("type").charAt(0).toUpperCase() + toolDataDto.getData("type").slice(1) : ""} Health Check Failed!`}</span>);
    }

    if (successfulConnection) {
      return (<span><FontAwesomeIcon icon={faLaptopMedical} className="mr-2" fixedWidth/>Health Check Succeeded!</span>);
    }

    return (<span><FontAwesomeIcon icon={faLaptopMedical} fixedWidth className="mr-2"/>{`Check ${toolDataDto.getData("type") ? toolDataDto.getData("type").charAt(0).toUpperCase() + toolDataDto.getData("type").slice(1) : ""} Health`}</span>);
  };

  const getConnectionModal = () => {    
    if(showConnectionLog){
      return(
        <ToolRegistryConnectionLogOverlay
          isLoading={false}
          handleClose={() => {
            setShowConnectionLog(false);
          }}
          data={log}
        />
      );
    }    
  };

  const getAdditionalDetailsForm = () => {
    if(showFeedPackageIdForm) {
      return (
        <OctopusFeedPackageIdInputModal 
          isLoading={false}
          handleClose={() => {
            setShowFeedPackageIdForm(false);
          }}
          callback={handleAdditionalData}
          dataObject={feedPackageDto}
          setDataObject={setFeedPackageDto}
        />
      );
    }
  };

  return (
    <div className="px-2">
        <Button size="sm" variant={getVariant()} disabled={isTesting || disable} onClick={() => testConnection()}>
          {getLabel()}
        </Button>
        { getConnectionModal() }
        { getAdditionalDetailsForm() }
    </div>
  );
}

TestConnectionButton.propTypes = {
  toolDataDto: PropTypes.object,
  disable: PropTypes.bool,
  toolName: PropTypes.string
};

TestConnectionButton.defaultProps = {
  disable: false,
};

export default TestConnectionButton;