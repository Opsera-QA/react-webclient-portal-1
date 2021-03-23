import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner, faLaptopMedical } from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";

function TestConnectionButton({ toolDataDto, disable }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isTesting, setIsTesting] = useState(false);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);

  const testConnection = async () => {
    try {
      setIsTesting(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);
      let response;

      if (toolDataDto != null) {
        response = await OctopusStepActions.validateItems(toolDataDto.getData("toolId"), toolDataDto.getData("spaceId"),toolDataDto.getData("type"),toolDataDto, getAccessToken);
      }

      if (response && response.data != null && response.data.status === "Success") {
        setSuccessfulConnection(true);
      }
      else {
        setFailedConnection(true);
      }
    }
    catch (error) {
      setFailedConnection(true);
    }
    finally {
      setIsTesting(false);
    }

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

  return (
    <div className="px-2">
        <Button size="sm" variant={getVariant()} disabled={isTesting || disable} onClick={() => testConnection()}>
          {getLabel()}
        </Button>
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