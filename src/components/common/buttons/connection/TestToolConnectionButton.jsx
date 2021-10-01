import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faPlug} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ToolRegisteryConnectionLogModal from "components/common/modal/ToolRegisteryConnectionLogModal";
import { isObject } from "@okta/okta-auth-js";

function TestToolConnectionButton({ toolDataDto, disabled, toolName }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isTesting, setIsTesting] = useState(false);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);
  const [showConnectionLog, setShowConnectionLog] = useState(false);

  const [log, setLog] = useState(["Starting connection test of tool...\n"]);
  const testConnection = async () => {
    try {
      setShowConnectionLog(true);
      setIsTesting(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);
      let response;

      if (toolDataDto != null) {
        response = await toolsActions.checkToolConnectivity(toolDataDto.getData("_id"), toolName, getAccessToken);
      }

      if (response && response.data != null && response.data.status === 200) {
        let message = isObject(response?.data?.message)
        ? JSON.stringify(response?.data?.message)
        : response?.data?.message;
      let status = response?.data?.status;
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
        let message = isObject(response?.data?.message)
          ? JSON.stringify(response?.data?.message)
          : response?.data?.message;
        let status = response?.data?.status;
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
        <Button
          size="sm"
          variant={getVariant()}
          disabled={isTesting === true || disabled === true}
          onClick={() => testConnection()}
        >
          {getLabel()}
        </Button>
      </TooltipWrapper>
      {showConnectionLog && (
        <ToolRegisteryConnectionLogModal
          isLoading={false}
          handleClose={() => {
            setShowConnectionLog(false);
          }}
          data={log}
        />
      )}
    </div>
  );
}

TestToolConnectionButton.propTypes = {
  toolDataDto: PropTypes.object,
  disabled: PropTypes.bool,
  toolName: PropTypes.string
};

export default TestToolConnectionButton;