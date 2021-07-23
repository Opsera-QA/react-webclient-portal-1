import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faPlug} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function TestToolConnectionButton({ toolDataDto, disable, toolName }) {
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
        response = await toolsActions.checkToolConnectivity(toolDataDto.getData("_id"), toolName, getAccessToken);
      }

      if (response && response.data != null && response.data.status === 200) {
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
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Testing Connection</span>);
    }

    if (failedConnection) {
      return (<span><FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" fixedWidth/>Connection Failed!</span>);
    }

    if (successfulConnection) {
      return (<span><FontAwesomeIcon icon={faPlug} className="mr-2" fixedWidth/>Connection Succeeded!</span>);
    }

    return (<span><FontAwesomeIcon icon={faPlug} fixedWidth className="mr-2"/>{`Test Connection`}</span>);
  };

  return (
    <div className="px-2">
      <TooltipWrapper
        innerText={`This tool must be saved before testing connection.`}
      >
        <Button size="sm" variant={getVariant()} disabled={isTesting || disable} onClick={() => testConnection()}>
          {getLabel()}
        </Button>
      </TooltipWrapper>
    </div>
  );
}

TestToolConnectionButton.propTypes = {
  toolDataDto: PropTypes.object,
  disable: PropTypes.bool,
  toolName: PropTypes.string
};

TestToolConnectionButton.defaultProps = {
  disable: false,
};

export default TestToolConnectionButton;